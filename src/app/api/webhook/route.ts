import dbConnect from '@/lib/mongo-connect';
import axios from 'axios';
import { NextResponse, type NextRequest } from 'next/server';
import Customer from '@/models/customer';
import Page from '@/models/page';
import Conversation from '@/models/conversation';
import crypto from 'crypto';
import Message from '@/models/message';

const getCustomerData = async ({
  psid,
  access_token
}: {
  psid: string;
  access_token: string;
}) => {
  const resp = await axios.get(
    `https://graph.facebook.com/${psid}?access_token=${access_token}&fields=first_name,last_name,profile_pic`
  );

  return resp.data;
};

export async function GET(request: NextRequest) {
  await dbConnect();

  // Parse the query params
  const searchParaams = request.nextUrl.searchParams;
  let mode = searchParaams.get('hub.mode');
  let token = searchParaams.get('hub.verify_token');
  let challenge = searchParaams.get('hub.challenge');

  // Check if a token and mode is in the query string of the request
  if (mode && token) {
    // Check the mode and token sent is correct
    if (mode === 'subscribe' && token === '123456789') {
      // Respond with the challenge token from the request
      console.log('WEBHOOK_VERIFIED');
      return new NextResponse(challenge, { status: 200 });
    } else {
      // Respond with '403 Forbidden' if verify tokens do not match
      return new NextResponse('', { status: 200 });
    }
  }
}

export async function POST(request: NextRequest) {
  await dbConnect();

  // const rawBody = await request.text();
  // var signature = request.headers.get('x-hub-signature-256');

  // if (!signature) {
  //   console.warn(`Couldn't find "x-hub-signature-256" in headers.`);
  // } else {
  //   var elements = signature.split('=');
  //   var signatureHash = elements[1];
  //   var expectedHash = crypto
  //     .createHmac('sha256', 'bcfe1a4e88d64460dbb1c40347e6a06b')
  //     .update(rawBody)
  //     .digest('hex');
  //
  //   if (signatureHash != expectedHash) {
  //     throw new Error("Couldn't validate the request signature.");
  //   }
  // }

  const body = await request.json();

  const {
    sender: { id: psid },
    recipient: { id: page_id },
    timestamp,
    message: { text: content }
  } = body.entry[0].messaging[0];

  const page = await Page.findOne({ page_id });
  const customer = await Customer.findOne({ psid });

  if (customer) {
    const resp = await Conversation.find({ customer, page })
      .sort({ modified_at: -1 })
      .limit(1);
    const convo = resp?.[0];

    if (convo && Number(convo.modified_at) + 1000 * 60 * 60 * 24 > Date.now()) {
      // last convo
      const msg = await Message.create({
        conversation: convo,
        timestamp: timestamp,
        content: content
      });
      convo.last_msg = msg;
      convo.modified_at = Date.now();
      await convo.save();
    } else {
      // new convo
      const newConvo = await Conversation.create({
        customer,
        page,
        modified_at: Date.now()
      });

      const msg = await Message.create({
        conversation: newConvo,
        timestamp: timestamp,
        content: content
      });
      newConvo.last_msg = msg;
      await newConvo.save();
    }
  } else {
    // new customew + new convo
    const cust = await getCustomerData({
      psid,
      access_token: page.access_token
    });

    const newCust = await Customer.create({
      first_name: cust.first_name,
      last_name: cust.last_name,
      profile_pic: cust.profile_pic,
      psid: psid
    });

    const newConvo = await Conversation.create({
      customer: newCust,
      page,
      modified_at: Date.now()
    });

    const msg = await Message.create({
      conversation: newConvo,
      timestamp: timestamp,
      content: content
    });
    newConvo.last_msg = msg;
    await newConvo.save();
  }

  if (body.object === 'page') {
    // Returns a '200 OK' response to all requests
    return new NextResponse('EVENT_RECEIVED', { status: 200 });

    // Determine which webhooks were triggered and get sender PSIDs and locale, message content and more.
  } else {
    // Return a '404 Not Found' if event is not from a page subscription
    return new NextResponse('', { status: 404 });
  }
}
