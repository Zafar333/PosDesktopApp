import React, { useEffect, useRef, useState } from "react";
// import QRCode from "react-qr-code";
import QRCode from "qrcode.react";

import "./userOrder.css";
import axios from "axios";
import { useReactToPrint } from "react-to-print";

import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  InputNumber,
  Space,
  DatePicker,
  Mentions,
  Select,
  TreeSelect,
  Cascader,
  Checkbox,
  Card,
  Col,
  Row,
} from "antd";
// import TextArea from "antd/es/input/TextArea";
import { json, useNavigate } from "react-router-dom";
import PrintPage from "../PrintPage/PrintPage";

const UserOrder = () => {
  const formRef = useRef();
  const printRef = useRef();
  const [userForm] = Form.useForm();

  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  const [grandTotal, setTotal] = useState(0);
  const [allFormData, setAllFormData] = useState();
  const [servicesFormData, setServicesFormData] = useState([]);

  const [userOrderModal, setUserOrderModal] = useState(false);
  const [customerModal, setCustomerModal] = useState(false);
  const [serviceModal, setServiceModal] = useState(false);
  const [qrtext, setQrtext] = useState([]);

  useEffect(() => {
    let grandtotal = 0;
    let ans = formData?.map((item) => {
      return (grandtotal += Number(item?.sum));
    });
    setTotal(ans[ans.length - 1]);
    console.log("formData", formData);
  }, [formData]);
  useEffect(() => {
    console.log("allformData", allFormData);
  }, [allFormData]);

  useEffect(() => {
    console.log("ServiceFormData", servicesFormData);
  }, [servicesFormData]);

  const layout = {
    labelCol: {
      span: 8,
    },
    wrapperCol: {
      span: 16,
    },
  };

  // customerinfoForm Data Post Api Function is Start here
  const customerInfoFormValues = async (values) => {
    let data = {
      ...values,
      date: new Date(),
      puredate: new Date(),
      totalAmount: grandTotal,
      orderProduct: [...formData],
    };
    console.log("data", data);
    let prepareText = `
  اسم الشركة: مؤسسة العنود محمد عبدالله الحماد للستائر
    اسم العميل: ${data?.customerName}
    الإجمالي الكلي: ${data?.totalAmount}
    `;

    // [
    //   "اسم الشركة:",
    //   "مؤسسة العنود محمد عبدالله الحماد للستائر:",
    //   "اسم العميل:",
    //   data?.customerName,
    //   "الإجمالي الكلي:",
    //   data?.totalAmount,
    // ]
    setQrtext(prepareText);
    setAllFormData(data);
    try {
      const res = await axios.post("http://localhost:4000/userOrderData", data);
      if (res?.status == 200) {
        alert(res?.data?.msg);
        handlePrint();
        // window.location.reload();
        setCustomerModal(false);
      }
    } catch (error) {
      alert(error);
    }
  };
  // customerinfoForm Data Post Api Function is End here

  const onFinish3 = (values) => {
    setServicesFormData([...servicesFormData, values]);
    console.log("yyyy", values);
  };
  const onFinishFailed3 = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  /* eslint-disable no-template-curly-in-string */
  const validateMessages = {
    required: "${label} is required!",
  };
  const validateMessages2 = {
    required: "${label} is required!",
  };
  /* eslint-enable no-template-curly-in-string */

  // userorder Form Onfinish function is start from here
  const onFinish = (values) => {
    values.sum = values?.productQuantity * values.unitPrice;
    setFormData([...formData, values]);
    console.log("formdatayyy", formData);
  };
  // userorder Form Onfinish function is end from here

  // print page functionality code is start here

  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });
  // print page functionality code is end here

  function opnUserOrderModal() {
    setUserOrderModal(true);
    setCustomerModal(false);
    setServiceModal(false);
  }
  function closeUserOrdrModal() {
    setUserOrderModal(false);
    window.location.reload();
    formRef.current.resetFields();
  }
  function closeUserOrdrModalAgain() {
    userForm.resetFields();
    setUserOrderModal(false);
    setCustomerModal(true);
  }
  function deleteRow(data) {
    const updataedData = formData?.filter((item, ind) => ind !== data);
    setFormData(updataedData);
  }
  function closeCustomerForm() {
    setCustomerModal(false);
    window.location.reload();
  }
  function closeCustomerFormGoback() {
    setCustomerModal(false);
    setUserOrderModal(true);
  }

  function opnAddServiceModal() {
    setServiceModal(true);
    setUserOrderModal(false);
  }
  function closeServiceForm() {
    setServiceModal(false);
  }

  return (
    <div>
      <div>
        <Space style={{ padding: "10px" }}>
          <Button
            type="primary"
            onClick={opnUserOrderModal}
            className="btnOrder"
          >
            Place Order
          </Button>
          <Button
            type="primary"
            onClick={opnAddServiceModal}
            className="btnOrder"
          >
            Add Services
          </Button>

          <Button type="primary" onClick={handlePrint} className="btnOrder">
            Print Page
          </Button>
        </Space>
      </div>
      <div className="userOderContainerView">
        <div className="userServicesView">
          {/* Add Product Service Section Code is Start from here */}
          <div className="userServicesSection">
            {servicesFormData.length > 0 ? (
              servicesFormData?.map((item, ind) => (
                <label className="serviceCard">
                  <div className="serviceCardTitle">
                    <label className="cardTitleLabel">
                      {item?.serviceName}
                    </label>
                  </div>
                  <hr />
                  <div className="serviceCardContent">
                    <label className="cardTitlePrice">
                      {item?.servicePrice}
                    </label>
                  </div>
                </label>
              ))
            ) : (
              <label
                style={{
                  width: "300px",
                  height: "10vh",
                  color: "white",
                  fontSize: "30px",
                  textAlign: "center",
                  // border: "1px solid white",
                }}
              >
                Please Add Services
              </label>
            )}
          </div>
        </div>
        {/* Add product Service Section Code is end here */}

        {/* UserOrder Table View Section Code is start here */}
        <div className="userOrderTableView">
          <div className="tableSection">
            <table className="userOrderTable">
              <thead>
                <tr>
                  <th>Product Name</th>
                  <th>Qunatity</th>
                  <th>Unit Price</th>
                  <th>Tax</th>
                  <th>Discount</th>
                  <th>Total</th>
                  <th>Description</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {formData?.length > 0 ? (
                  formData?.map((item, ind) => (
                    <tr key={ind}>
                      <td>{item?.productName}</td>
                      <td>{item?.productQuantity}</td>
                      <td>{item?.unitPrice}</td>
                      <td>{item?.tax}</td>
                      <td>{item?.discount}</td>
                      <td>{item?.sum}</td>
                      <td>{item?.description}</td>
                      <td>
                        <Button danger onClick={() => deleteRow(ind)}>
                          Delete
                        </Button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan={"8"}>No Record</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>

          <div className="totalPriceSection">
            <div>
              <h3>
                Grand Total: <strong>{grandTotal || 0}</strong>
              </h3>
            </div>
            {formData.length > 0 ? (
              <Button
                type="primary"
                style={{
                  width: "140px",
                  height: "43px",
                  fontSize: "22px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                onClick={closeUserOrdrModalAgain}
              >
                Next
              </Button>
            ) : (
              <label style={{ display: "hidden" }}></label>
            )}
          </div>
        </div>
      </div>
      {/* UserOrder Table View Section Code IS End here */}

      {/* UserOrder Form View Section Code IS Start here */}
      <div
        className={userOrderModal == true ? "openUserModal" : "closeUserModal"}
      >
        <div className="userOrderFormView">
          <div className="formHeading">
            <label>Abu Fahad Shop</label>
          </div>
          <Form
            ref={formRef}
            className="orderForm"
            {...layout}
            form={userForm}
            name="nest-messages"
            onFinish={onFinish}
            validateMessages={validateMessages}
            // className="ant-form"
          >
            <Form.Item
              name={"productName"}
              label="Poduct Name"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input />
            </Form.Item>
            <Form.Item
              name={"productQuantity"}
              label="Quantity"
              rules={[
                {
                  required: true,
                },
              ]}
            >
              <Input type="number" />
            </Form.Item>
            <Form.Item
              name={"unitPrice"}
              label="Unit Price"
              rules={[{ required: true }]}
            >
              <Input type="number" />
            </Form.Item>

            <Form.Item name={"tax"} label="Tax  ">
              <Input type="number" />
            </Form.Item>

            <Form.Item name={["discount"]} label="Discount">
              <Input type="number" />
            </Form.Item>

            <Form.Item name={"description"} label="Description">
              <Input.TextArea />
            </Form.Item>
            <Form.Item
              wrapperCol={{
                ...layout.wrapperCol,
                offset: 8,
              }}
            >
              <Space>
                <Button type="primary" htmlType="submit">
                  Add
                </Button>
                <Button type="primary" onClick={closeUserOrdrModal}>
                  Cancel
                </Button>
              </Space>
            </Form.Item>
          </Form>
        </div>
      </div>
      {/* UserOrder Form View Section Code IS End here */}

      {/* Customer Info Form View Section Code IS Start here */}

      <div
        className={
          customerModal == true ? "customerInfoForm" : "closeCustomerInfoForm"
        }
      >
        <h2 style={{ textAlign: "center", paddingTop: "10px" }}>
          Customer Information
        </h2>
        <Form
          ref={formRef}
          name="basic"
          labelCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={customerInfoFormValues}
          onFinishFailed={onFinishFailed}
          autoComplete="off"
        >
          <Form.Item label="Customer Name" name="customerName">
            <Input />
          </Form.Item>
          <Form.Item label="Company Name" name="companyName">
            <Input />
          </Form.Item>

          <Form.Item
            label="Conatct Number"
            name="contactNumber"
            rules={[
              {
                required: true,
                message: "Please Enter your Contact Number!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Cash Status"
            name="cashStatus"
            rules={[
              {
                required: true,
                message: "Please Enter your CashStatus!",
              },
            ]}
          >
            <Select style={{ width: "60%" }}>
              <Select.Option value="Unpaid">Unpaid</Select.Option>
              <Select.Option value="Paid">Paid</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Piad Amount"
            name="paidAmount"
            rules={[
              {
                required: true,
                message: "Please Enter paid Amount ",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Form.Item
            label="Address"
            name="address"
            // rules={[
            //   {
            //     required: true,
            //     message: "Please Enter your Address!",
            //   },
            // ]}
          >
            <Input.TextArea style={{ fontSize: "18px" }} />
          </Form.Item>

          {/* <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          ></Form.Item> */}
          <div className="customerInfoFormButtonContainer">
            <Button type="primary" onClick={closeCustomerFormGoback}>
              Go Back
            </Button>
            <Button type="primary" htmlType="submit">
              Print Bill
            </Button>
            <Button type="primary" onClick={closeCustomerForm}>
              Cancel
            </Button>
          </div>
        </Form>
      </div>
      {/* Customer Info Form View Section Code IS end here */}

      {/* Add Services Info Form View Section Code IS Start here */}
      <div
        className={
          serviceModal == true
            ? "serviceFormContainer"
            : "closeServiceFormContainer"
        }
      >
        <h2 style={{ paddingBottom: "5px" }}>Services</h2>
        <Form
          name="control-hooks"
          labelCol={{
            span: 8,
          }}
          initialValues={{
            remember: true,
          }}
          onFinish={onFinish3}
          onFinishFailed={onFinishFailed3}
          autoComplete="off"
        >
          <Form.Item
            label="Service Name"
            name="serviceName"
            rules={[
              {
                required: true,
                message: "Please Enter your Service Name!",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Service Price"
            name="servicePrice"
            rules={[
              {
                required: true,
                message: "Please Enter your Price!",
              },
            ]}
          >
            <Input type="number" />
          </Form.Item>

          <Space>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
            <Button type="primary" onClick={closeServiceForm}>
              Cancel
            </Button>
          </Space>
        </Form>
      </div>
      {/* <PrintPage /> */}

      <div ref={printRef} className="printPage">
        <div className="printPageContainer">
          <div className="companyContainer">
            <div className="companyNameCrad">
              <span className="companyLogoText">
                MOUSSASAT AL-ANOUD MOHAMMAD ABDULLAH
                <br />
                AL-HAMMAD LIL SUTAYR
              </span>
            </div>
            <div className="qrCard">
              <div>
                {qrtext?.length > 0 ? (
                  <QRCode
                    size={120}
                    // className="qrcodeComponent"
                    value={`${qrtext}`}
                    // value="فاتورة مبسط"
                    style={{ fontFamily: "sans-serif" }}
                  />
                ) : (
                  <h1>No Qr Generate</h1>
                )}
              </div>
            </div>
            <div className="comapnyDetailCard">
              <span className="invoiceText">
                فاتورة مبسطة Simplified Invoice
              </span>

              <div className="arabicCompanyDetailCard">
                <div className="arabicCompanyNameText">
                  <span className="arabicTextLogo">
                    مؤسسة العنود محمد عبدالله الحماد للستائر
                  </span>
                </div>
                <div className="companyAddressText">
                  الرياض...المصيف...شارع ابن سينا
                </div>
                <div className="companyContactDetail">
                  <div className="phn1">0556579345</div>
                  <div className="phn2">0582136968</div>
                </div>
              </div>
            </div>
          </div>

          <div className="billCard">
            <div className="InvoiceDetailCard">
              <div className="englishInvoiceCard">
                <div className="billInvoiceText">Invoice No</div>
                <div className="billDateText">Date</div>
                <div className="paymentStatusText">Payment Status</div>
              </div>
              <div className="englishInvoiceCardValue">
                <div className="billInvoiceTextValue">46587678-00</div>
                <div className="billDateTextValue">12-1-2024</div>
                <div className="paymentStatusTextValue">
                  {allFormData?.cashStatus}
                </div>
              </div>
              <div className="arabicTitleCard">
                <div className="billInvoiceText">رقم الفاتورة</div>
                <div className="billDateText">التاريخ</div>
                <div className="paymentStatusText">حالة الدفع</div>
              </div>
            </div>

            <div className="billToCard">
              <div className="billToText">Bill to</div>
              <div className="BilltoCustomerInfo">
                <div className="billCustomerName">
                  {allFormData?.customerName}
                </div>
                <div className="billCustomerAddress">
                  {allFormData?.address}
                </div>
              </div>
            </div>
          </div>

          <div className="customerBillTable">
            <table className="billTable">
              <thead>
                <tr>
                  <th>Total الإجمالي</th>
                  <th>Discount خصم</th>
                  <th>Vat الضريبة</th>
                  <th>Unit price سعر الوحدة</th>
                  <th>Quantity الكمية</th>
                  <th>Product Name اسم المنتج</th>
                  <th>ID الرقم التعريفي</th>
                </tr>
              </thead>
              <tbody>
                {allFormData?.orderProduct?.map((item, ind) => (
                  <tr key={ind}>
                    <td>{ind + 1}</td>
                    <td>{item?.sum}</td>
                    <td>{item?.discount}</td>
                    <td>{item?.tax}</td>
                    <td>{item?.unitPrice}</td>
                    <td>{item?.productQuantity}</td>
                    <td>{item?.productName}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="paymentDetailCard">
            <div className="grandTotalCard">
              <div className="grandTotalValue">{allFormData?.totalAmount}</div>
              <div className="grandTotalTitle">Grand Total الإجمالي الكلي</div>
            </div>
            <div className="paidAmountCard">
              <div className="paidAmountValue">{allFormData?.paidAmount}</div>
              <div className="paidAmountTitle">Paid Amount المبلغ المدفوع</div>
            </div>
            <div className="amountDueCard">
              <div className="amountDueValue">
                {`${allFormData?.totalAmount} - ${allFormData?.paidAmount}`}
              </div>
              <div className="amountDueTitle">Amount Due المبلغ المستحق</div>
            </div>
          </div>
        </div>
      </div>
      {/* Add Services Info Form View Section Code IS end here */}
      {/* <Qrcode /> */}
    </div>
  );
};

export default UserOrder;
