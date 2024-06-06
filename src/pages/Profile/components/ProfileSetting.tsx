import FormItem from '@/commons/components/Form/FormItem';
import AppModal from '@/commons/components/Public/AppModal';
import ToggleCheckboxButton from '@/pages/ShoppingCart/components/ToggleCheckboxButton';
import { Button, Form, Input } from 'antd';
import { useState } from 'react';

export default function Setting() {
  const [openChangePasswordModal, setOpenChangePasswordModal] = useState(false);

  return (
    <>
      <h2 className="mb-1-05">Settings</h2>
      <div className="profile-settings-card">
        <div className="profile-settings-card-content">
          <h4>Language</h4>
          <p className="mt-05">Select your language</p>
        </div>
        <select name="settings-language" id="settings-language">
          <option value="indonesia">Indonesia</option>
          <option value="english">English</option>
        </select>
      </div>
      <div className="profile-settings-card mt-1-05">
        <div className="profile-settings-card-content">
          <h4>Push Notifications</h4>
          <p className="mt-05">Receive push notification</p>
        </div>
        <ToggleCheckboxButton />
      </div>
      <div className="profile-settings-card mt-1-05">
        <div className="profile-settings-card-content">
          <h4>Email Notification</h4>
          <p className="mt-05">Receive email notification</p>
        </div>
        <ToggleCheckboxButton />
      </div>
      <button className="btn mt-2" onClick={() => setOpenChangePasswordModal(true)}>
        Change password
      </button>

      {openChangePasswordModal && (
        <AppModal title="Change Password" close={() => setOpenChangePasswordModal(false)}>
          <Form layout="vertical">
            <FormItem
              label="Old Password"
              name="oldPassword"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input.Password placeholder="Old Password" size="large" />
            </FormItem>
            <FormItem
              label="New Password"
              name="newPassword"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input.Password placeholder="New Password" size="large" />
            </FormItem>
            <FormItem
              label="Confirm New Password"
              name="confirmNewPassword"
              className="font-normal"
              rules={[{ required: true }]}
              // validationErrors={validationErrors}
            >
              <Input.Password placeholder="Confirm New Password" size="large" />
            </FormItem>
            <Button
              type="primary"
              onClick={() => console.log('Submit')}
              className="w-full bg-color-[#18428F] shadow-none"
              size="large"
              loading={false}
              style={{
                backgroundColor: '#18428F',
                borderColor: '#18428F',
                borderRadius: '25rem',
                padding: '1.5rem 0',
              }}
            >
              Save
            </Button>
          </Form>
        </AppModal>
      )}
    </>
  );
}
