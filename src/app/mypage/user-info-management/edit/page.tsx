import UserInfoEditForm from "@/src/components/user/UserInfoEditForm";
import { getUserInfo } from "@/src/lib/data/user";

export default async function UserInfoEditPage() {
  const userInfo = await getUserInfo();

  return (
    <div className="mx-auto p-4 text-[14px]">
      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">로그인 정보</h4>
        <hr className="border-black mb-6" />
        <UserInfoEditForm initialUserInfo={userInfo} />
      </div>

      <div className="mb-12">
        <h4 className="text-lg font-bold mb-2">회원 정보</h4>
        <hr className="border-black mb-6" />
        <div className="flex flex-col gap-6 px-4">
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">이름</span>
            <span className="text-gray-900 font-semibold">
              {userInfo?.name || "최예성"}
            </span>
          </div>
          <div className="flex items-center">
            <span className="w-32 font-medium text-gray-600">생년월일</span>
            <span className="text-gray-900">1999년 08월 19일</span>
          </div>
          <div className="flex items-start">
            <span className="w-32 font-medium text-gray-600 mt-1">연락처</span>
            <div className="flex flex-col gap-3">
              <span className="text-gray-400">010-2799-5852</span>
              <button className="px-6 py-2 bg-black text-white font-bold cursor-pointer">
                본인인증하고 정보 수정하기
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mb-40 flex flex-col gap-8 items-center justify-center">
        <button className="border px-4 py-2 text-[14px] cursor-pointer">
          확인
        </button>
        <button className="text-[13px] text-gray-500 underline cursor-pointer">
          회원 탈퇴하기
        </button>
      </div>
    </div>
  );
}
