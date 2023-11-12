import React, { useState } from "react";
import { Button, Modal, Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentTypesThunk } from "../../redux/thunk/paymentThunk";
import { postTransactionThunk } from "../../redux/thunk/transactionThunk";
import { userLocalStorage } from "../../utils/config";
import { openNotification } from "../../components/notification/notification";
import { openModal, closeModal } from "../../redux/slice/paymentSlice";

const Package = ({ features, price, accountType }) => {
    const dispatch = useDispatch();
    const userInfo = userLocalStorage.get().customer;
    const accountTypeMap = {
        "Free": 1,
        "Standard": 2,
        "Premium": 3,
        "Enterprise": 4
    };

    const [paymentMethod, setPaymentMethod] = useState("");

    const { paymentTypes, canOpenModal, loading } = useSelector((state) => state.paymentSlice);

    const handleOpenModal = () => {
        dispatch(getPaymentTypesThunk(accountType));
    }

    const handleCloseModal = () => {
        dispatch(closeModal());
        setPaymentMethod("");
    }

    const handleSubmit = () => {
        dispatch(postTransactionThunk({
            "customerId": userInfo.id,
            "accountTypeId": accountTypeMap[accountType],
            "paymentId": paymentTypes[paymentMethod].id,
            "content": userInfo.email + "_" + userInfo.phone,
            "amount": parseInt(price.replace(".", "")),
            "paymentDate": new Date().toISOString(),
            "isBanking": false
        }))
            .then((response) => {
                if (response.type == postTransactionThunk.rejected) {
                    openNotification("error", "Submit transaction failed", response.error.message);
                }
                if (response.type == postTransactionThunk.fulfilled) {
                    openNotification("success", "Submit transaction successfully", "Transaction is being processed");
                }
            });
        dispatch(closeModal());
        setPaymentMethod("");
    }

    return (
        <div className="list__package-item">
            <div className="list__package-item-header">{accountType.toUpperCase()}</div>
            <ul>
                {features.map((feature, index) => {
                    return <li key={index}>{feature}</li>;
                })}
            </ul>
            {accountType !== "Free" &&
                <>
                    <span>{price} VNĐ/Month</span>
                    <button
                        disabled={accountType === "Enterprise"}
                        onClick={handleOpenModal}
                    >
                        Upgrade {accountType}
                    </button>
                    <Modal
                        loading={loading}
                        title="PAYMENT"
                        width={"60%"}
                        open={canOpenModal[accountType]}
                        onCancel={handleCloseModal}
                        footer={[
                            <Button key={1} onClick={() => { setPaymentMethod("TPBank") }}>
                                TPBank
                            </Button>,
                            <Button key={2} onClick={() => { setPaymentMethod("ZaloPay") }}>
                                ZaloPay
                            </Button>,
                            <Button key={3} hidden={paymentMethod == ""} onClick={handleSubmit} type="primary" >
                                Submit
                            </Button>
                        ]}
                    >
                        {paymentMethod !== "" &&
                            <div className="row">
                                <img
                                    src={paymentTypes[paymentMethod].qrCode}
                                    alt={paymentMethod}
                                    style={{
                                        width: "30%",
                                        float: "left"
                                    }} />
                                <Descriptions
                                    title="User Info"
                                    layout="horizontal"
                                    bordered={true}
                                    style={{
                                        width: "70%",
                                        float: "right"
                                    }}
                                >
                                    <Descriptions.Item span={12} label="Email">{userInfo.email}</Descriptions.Item>
                                    <Descriptions.Item span={12} label="Phone">{userInfo.phone}</Descriptions.Item>
                                    <Descriptions.Item span={12} label="Payment Method">{paymentMethod}</Descriptions.Item>
                                    <Descriptions.Item span={12} label="Account Type">{accountType}</Descriptions.Item>
                                    <Descriptions.Item span={12} label="Amount">{price}</Descriptions.Item>
                                    <Descriptions.Item span={12} label="Content">{"ProTracking_" + userInfo.email + "_" + accountType}</Descriptions.Item>
                                </Descriptions>
                            </div>
                        }
                    </Modal>
                </>
            }
        </div >
    );
}

export default Package;
