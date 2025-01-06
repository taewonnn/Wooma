import MenuCategories from '../../components/member/settings/MenuItems';
import SettingCateogry from '../../components/member/settings/SettingCategory';

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
