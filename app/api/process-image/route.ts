import { promises as fs } from "fs";
import { NextResponse } from "next/server";

const IMAGE_PATH =
  "C:\\Users\\lky22\\.cursor\\projects\\d-cursorProject-iso\\assets\\c__Users_lky22_AppData_Roaming_Cursor_User_workspaceStorage_6012ff27849bc7060b3de8514b342fbd_images_process_info-717a13a8-874a-47cd-8e96-aab5a0c1fb3b.png";

export async function GET() {
  try {
    const file = await fs.readFile(IMAGE_PATH);
    return new NextResponse(file, {
      status: 200,
      headers: {
        "Content-Type": "image/png",
        "Cache-Control": "no-store, max-age=0",
      },
    });
  } catch {
    return NextResponse.json({ error: "이미지를 찾을 수 없습니다." }, { status: 404 });
  }
}

