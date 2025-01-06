import AccountInfo from '../../components/member/account/AccountInfo';
import CategorySetting from '../../components/member/account/CategorySetting';
import CustomerServiceMenu from '../../components/member/account/CustomerServiceMenu';

function Settings() {
  return (
    <>
      <div className="text-222 pb-[20px] text-lg font-bold">설정</div>

      <div className="bg-white p-[20px] pb-[50px]">
        {/** 회원정보 */}
        <AccountInfo />

        {/** 비밀번호 재설정 */}
        {/* <></> */}

        {/** 카테고리 설정 */}
        <CategorySetting />

        {/** 고객센터 */}
        <CustomerServiceMenu />
      </div>
    </>
  );
}

export default Settings;
