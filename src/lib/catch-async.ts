import { NextRequest, NextResponse } from 'next/server';

const catchAsync = (
  fun: (req: NextRequest, route?: any) => Promise<NextResponse> | NextResponse
) => {
  return async (req: NextRequest, route?: any) => {
    try {
      return await fun(req, route);
    } catch (err: any) {
      console.log(err);
      return NextResponse.json(
        { error: err?.message || 'internal_server_error' },
        { status: 400 }
      );
    }
  };
};

export default catchAsync;
