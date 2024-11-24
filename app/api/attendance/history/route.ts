import {NextResponse} from 'next/server';

export async function GET(request: Request) {
  try {
    const {searchParams} = new URL(request.url);
    const userNo = searchParams.get('userNo');
    const timeStart = searchParams.get('timeStart');
    const timeEnd = searchParams.get('timeEnd');
    let url = 'http' + '://' + 'localhost:81';
    let uri = '/xb/zk/attendance/v2/record.do';
    let fullUrl = `${url}${uri}?userNo=${userNo}&timeStart=${timeStart}&timeEnd=${timeEnd}&openId=o45LO4l28n6aa4dFCXB3BBYOFWNs&userVerifyNumber=15824821718`;
    console.info('fullUrl:', fullUrl);
    const response = await fetch(fullUrl,
      {
        headers: {
          'User-Agent': 'Apifox/1.0.0 (https://apifox.com)',
        },
      }
    );
    console.info('response:', response);
    const data = await response.json();
    console.info('data:', data);
    return NextResponse.json({success: true, data});
  }
  catch (error) {
    return NextResponse.json(
      {success: false, error: 'Failed to fetch history'},
      {status: 500}
    );
  }
}
