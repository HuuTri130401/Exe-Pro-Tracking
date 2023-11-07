import React, { useState } from "react";
import { Button, Modal, Descriptions } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { getPaymentTypesThunk } from "../../redux/thunk/paymentThunk";
import { postTransactionThunk } from "../../redux/thunk/transactionThunk";
import { userLocalStorage } from "../../utils/config";
import { openNotification } from "../../components/notification/notification";

const Package = ({ features, price, accountType }) => {
    const dispatch = useDispatch();
    const userInfo = userLocalStorage.get().customer;
    const accountTypeMap = {
        "Free": 1,
        "Standard": 2,
        "Premium": 3,
        "Enterprise": 4
    };

    const [openModal, setOpenModal] = useState(false);
    const [paymentMethod, setPaymentMethod] = useState("");

    const { paymentTypes } = useSelector((state) => state.paymentSlice);
    const { loading } = useSelector((state) => state.paymentSlice);

    const handleOpenModal = () => {
        dispatch(getPaymentTypesThunk(accountType))
        setOpenModal(true);
    }

    const handleCloseModal = () => {
        setOpenModal(false);
        setPaymentMethod("");
    }

    const handleSubmit = () => {
        dispatch(postTransactionThunk({
            "customerId": userInfo.id,
            "accountTypeId": accountTypeMap[accountType],
            "paymentId": paymentTypes[paymentMethod].id,
            "content": userInfo.email + "_" + userInfo.phone,
            "amount": parseInt(price.replace(".", "")),
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
        setOpenModal(false);
        setPaymentMethod("");
    }

    const processGoogleDriveLink = (link) => {
        const imageId = link.split("/")[5];
        return `https://drive.google.com/uc?export=view&id=${imageId}`;
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
                    <h6>{price} VNĐ/Month</h6>
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
                        open={openModal}
                        onCancel={handleCloseModal}
                        footer={[
                            <Button onClick={() => { setPaymentMethod("TPBank") }}>
                                TPBank
                            </Button>,
                            <Button onClick={() => { setPaymentMethod("ZaloPay") }}>
                                ZaloPay
                            </Button>,
                            <Button hidden={paymentMethod == ""} onClick={handleSubmit} type="primary" >
                                Submit
                            </Button>
                        ]}
                    >
                        {paymentMethod !== "" &&
                            <div class="row">
                                <img
                                    src={processGoogleDriveLink(paymentTypes[paymentMethod].qrCode)}
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
