import React from 'react'
import ProfileTemplate from '../templates/ProfileTemplate';
import MenuTop from "../organisms/MenuTop";
export default function ProfilePage() {
     return (
          <>
            <MenuTop />
            <div className="p-grid p-d-flex">
                <div className="p-col-10 p-offset-1">
                    <ProfileTemplate />
                </div>
            </div>
        </>
     )
}
