import MenuCategories from '../../components/member/account/MenuItems';
import SettingCateogry from '../../components/member/account/SettingCategory';

function Settings() {
  return (
    <>
      <div className="bg-white p-[20px] pb-[50px]">
        {MenuCategories.map((category, index) => (
          <SettingCateogry key={index} title={category.title} menuItems={category.items} />
        ))}
      </div>
    </>
  );
}

export default Settings;
