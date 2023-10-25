import React from "react";

const ListPackage = () => {
  return (
    <div className="list__package">
      <div className="list__package-item">
        <div className="list__package-item-header">FREE</div>
        <ul>
          <li>Limit 3 user accounts in a project</li>
          <li>Limit 10 projects per user</li>
          <li>Ask 20 question in every 3 hours</li>
        </ul>
      </div>
      <div className="list__package-item">
        <div className="list__package-item-header">STANDARD</div>
        <ul>
          <li>Limit 10 user accounts in a project</li>
          <li>Limit  30 projects per user</li>
          <li>Ask 100 questions in every 3 hours</li>
          <li>Cập nhập thông tin từ Google</li>
        </ul>
        <h6>49.000 VNĐ/Month</h6>
        <button>Upgrade Standard</button>
      </div>
      <div className="list__package-item">
        <div className="list__package-item-header">PREMIUM</div>
        <ul>
          <li>Unlimited user accounts in a project</li>
          <li>Unlimited projects per user</li>
          <li>Gain access to Chat GPT</li>
          <li>Project knowledge</li>
        </ul>
        <h6>99.000 VNĐ/Month</h6>
        <button>Upgrade Premium</button>
      </div>
      <div className="list__package-item">
        <div className="list__package-item-header">ENTERPRISE</div>
        <ul>
          <li>Future planning</li>
        </ul>
        <h6>129.000 VNĐ/Month</h6>
        <button>Upgrade Enterprise</button>
      </div>
    </div>
  );
};

export default ListPackage;
