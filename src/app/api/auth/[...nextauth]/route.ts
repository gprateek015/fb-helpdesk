import NextAuth from 'next-auth';
import FacebookProvider from 'next-auth/providers/facebook';

const handler = NextAuth({
  providers: [
    FacebookProvider({
      clientId: process.env.FACEBOOK_CLIENT_ID as string,
      clientSecret: process.env.FACEBOOK_CLIENT_SECRET as string,
      authorization: {
        params: {
          scope:
            'email pages_show_list pages_messaging pages_read_engagement pages_manage_metadata'
        }
      }
    })
  ],
  callbacks: {
    async jwt({ token, account, profile }) {
      // Persist the OAuth access_token and or the user id to the token right after signin
      // console.log(account, token, profile);

      if (account) {
        token.accessToken = account.access_token;
        token.id = (profile as any)?.id;
      }
      return token;
    },
    async session({
      session,
      token,
      user
    }: {
      session: any;
      token: any;
      user: any;
    }) {
      // Send properties to the client, like an access_token and user id from a provider.
      session.accessToken = token.accessToken;
      session.user.id = token.id;

      return session;
    }
  }
});

export { handler as GET, handler as POST };
