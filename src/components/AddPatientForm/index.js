import React, { useState, useEffect } from "react";
import {
  Typography,
  Row,
  Col,
  Form,
  Input,
  Select,
  Checkbox,
  Space,
  Radio,
  notification,
} from "antd";
import cities from "./cities.json";
import types from "./types.json";
import WTCP from "./WTCP.json";
import { registerPatient } from '@redux/actions/patient';
import { useDispatch, useSelector } from 'react-redux';
import useTranslation from 'next-translate/useTranslation';
import { useRouter } from "next/router";
import styles  from './patient-form.module.scss'
import CustomButton from "../CustomBtn";
import { api } from "@src/utils/network";
import { clearUser } from "@src/redux/actions/user";
const { Title, Text } = Typography;
const { Option } = Select;

const index = () => {
  const { t } = useTranslation('create-patient'); 
  const [form] = Form.useForm();
  const router = useRouter()
  const dispatch = useDispatch();
  const user = useSelector(state => state.user)
  const [errorsCreatingPatient, setErrorsCreatingPatient] = useState([])
  const [createdPatientSuccess, setCreatedPatientSuccess] = useState(false)
  const [loading, setLoading] = useState(false)

  console.log(api.defaults.headers)
  useEffect(() => {
    if(!user || !user.accessToken){
      // enable this after we have the token in redux
      // dispatch(clearUser())
      // router.push("/login");
    }
  }, [user])

  useEffect(() => {
    if(createdPatientSuccess){
      notification.success({
        message: t("Created patient successfully")
      })
      form.resetFields()
    }
  },[createdPatientSuccess])
  const [showInsulinType, setShowInsulinType] = useState(false);
  const onValuesChange = ({ treatment }) => {
    if (treatment && treatment === "INSULIN") {
      setShowInsulinType(true);
    } else if (treatment) {
      setShowInsulinType(false);
    }
  };

  useEffect(() => {
    if (errorsCreatingPatient?.length) {
      notification.error({
        message: t("Error Creating patient"),
        description: errorsCreatingPatient.join(', \n'),
      });
    }
  }, [errorsCreatingPatient]);

  const onFinish = async (values) => {
    let treatmentType = "";
    if (values.treatment === "INSULIN") {
      treatmentType = values.insulin_treatment;
    } else {
      treatmentType = values.treatment;
    }
    let healthIssues = values.healthIssues;
    let isOtherHealthIssues = false;
    let otherHealthIssues = "";
    if (healthIssues && healthIssues.length) {
      let i = healthIssues?.indexOf("Other");
      if (i > -1) {
        healthIssues.splice(i, 1);
        isOtherHealthIssues = true;
        otherHealthIssues = values.otherHealthIssues;
      }
    }
    let diabetesComplications = values.diabetesComplications;
    let isOtherDiabetesComplications = false;
    let otherDiabetesComplications = "";
    if (diabetesComplications && diabetesComplications?.length) {
      let j = diabetesComplications?.indexOf("Other");
      if (j !== -1) {
        diabetesComplications.splice(j, 1);
        isOtherDiabetesComplications = true;
        otherDiabetesComplications = values.otherDiabetesComplications;
      }
    }

    const data = {
      ...values,
      name: values.name.trim(),
      note: values.note.trim(),
      treatmentType,
      healthIssues,
      isOtherHealthIssues,
      diabetesComplications,
      isOtherDiabetesComplications,
      otherHealthIssues,
      otherDiabetesComplications,
      I_C: `${values.i}:${values.c}`
    };

    try {
      setLoading(true)
      const res = await api.post('patient/createPatient', data, {headers: {Authorization: `Bearer ${user.accessToken}`}})
      if(res.status === 201){
        dispatch(registerPatient(res.data));
        setCreatedPatientSuccess(true)
        setLoading(false)
      }
    } catch (error) {
      if(error?.response?.data?.error?.message){
        // TO DO  if RTL ? or LTR
        setErrorsCreatingPatient([error.response.data.error.message.en])
      }else if (error?.response?.data?.message?.length) {
        setErrorsCreatingPatient(error.response.data.message)
      }else {
        setErrorsCreatingPatient([t('Error in the server')])
      }
      setLoading(false)
    }
    
  };

  return (
    <div className={styles.form_container} >
      <Title className={styles.title__registration}>{t("Register Patient")}</Title>
      <Form
        form={form}
        layout={"vertical"}
        name="register"
        onFinish={onFinish}
        onValuesChange={onValuesChange}
        scrollToFirstError
      >
        <Row type="flex" justify="space-around" align="flex-start">
          <Col lg={7} className={styles.patient_register_column}>
            <Text className={styles.title_form}>{t("Patient Information")}</Text>
            <div className={styles.patient_register_column_wrapper}>
              <Form.Item
                name="name"
                label={<p className={styles.label_form}>{t("Name")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input patient name",
                  },
                ]}
              >
                <Input placeholder="Omar Saleh" />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label={<p className={styles.label_form}>{t("Phone")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input patient phone",
                  },
                  {
                    pattern: /^(5)(0|2|3|4|5|6|7|8|9)([0-9]{7})$/,
                    message: "Phone number should be in this format 5xxxxxxxx",
                  },
                ]}
              >
                <Input placeholder="5xxxxxxxx" />
              </Form.Item>
              <Form.Item
                name="gender"
                label={<p className={styles.label_form}>{t("Gender")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please select Gender",
                  },
                ]}
              >
                <Radio.Group className={styles.radio_container}>
                  <Radio value="Male">
                    {<p className={styles.label_form}>{t("Male")}</p>}
                  </Radio>
                  <Radio value="Female">
                    {<p className={styles.label_form}>{t("Female")}</p>}
                  </Radio>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="city"
                label={<p className={styles.label_form}>{t("City")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please select city!",
                  },
                ]}
              >
                <Select placeholder="select patient city">
                  {cities.map((city) => {
                    return (
                      <Option key={city.id} value={city.name_en}>
                        {city.name_en}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>

              <Form.Item
                name="age"
                label={<p className={styles.label_form}>{t("age")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input patient age",
                    
                  },
                ]}
              >
                <Input placeholder="15" />
              </Form.Item>
            </div>
          </Col>
          <Col lg={7} className={styles.patient_register_column}>
            <Text className={styles.title_form}>{t("Diabetes Information")}</Text>
            <div className={styles.patient_register_column_wrapper}>
              <Form.Item
                name="diabetesType"
                label={
                  <p className={styles.label_form}>{t("Diabetes type")}</p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select Diabetes type",
                  },
                ]}
              >
                <Select placeholder="select patient Diabetes type">
                  {types.map((type) => {
                    return (
                      <Option key={type.id} value={type.name_en}>
                        {type.name_en}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="treatment"
                  className={styles.form_item}
                label={
                  <p className={styles.label_form}>
                    {t("Is the patient on ")}
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select treatment",
                  },
                ]}
              >
                {/* Style needed to handle ltr && rtl */}
                <Radio.Group style={{textAlign: 'left'}}>
                  <Space direction="vertical">
                    <Radio value="INSULIN">
                      {<p className={styles.label_form}>{t("Insulin")}</p>}
                    </Radio>
                    {showInsulinType ? (
                      <Form.Item
                        name="insulin_treatment"
                        rules={[
                          {
                            required: true,
                            message: "Please select Insulin type",
                          },
                        ]}
                      >
                        <Radio.Group>
                          <Space
                            className={styles.inner_radio}
                            direction="vertical"
                          >
                            <Radio value="FIXED_DOSES">
                              {
                                <p className={styles.label_form}>
                                  {t("Fixed doses")}
                                </p>
                              }
                            </Radio>
                            <Radio value="CARBOHYDRATE_TO_INSULIN_RATION">
                              {
                                <p className={styles.label_form}>
                                  {t("Carbohydrate to insulin ration")}
                                </p>
                              }
                            </Radio>
                            <Radio value="SLIDINGSCALE_INSULIN_THERAPY_SSI">
                              {
                                <p className={styles.label_form}>
                                  {t("Slidingscale insulin therapy SSI")}
                                </p>
                              }
                            </Radio>
                          </Space>
                        </Radio.Group>
                      </Form.Item>
                    ) : null}
                    <Radio value="ORAL_MEDICATION">
                      {
                        <p className={styles.label_form}>
                          {t("Oral medication")}
                        </p>
                      }
                    </Radio>
                    <Radio value="NONE_OF_THESE">
                      {
                        <p className={styles.label_form}>
                          {t("None of these")}
                        </p>
                      }
                    </Radio>
                  </Space>
                </Radio.Group>
              </Form.Item>
              <Form.Item
                name="watcher"
                label={
                  <p className={styles.label_form}>
                    {t("Who takes care of the patient?")}
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please select who takes care of patient",
                  },
                ]}
              >
                <Select placeholder="select patient who takes care of patient">
                  {WTCP.map((who) => {
                    return (
                      <Option key={who.id} value={who.id}>
                        {who.name_en}
                      </Option>
                    );
                  })}
                </Select>
              </Form.Item>
              <Form.Item
                name="ISF"
                label={<p className={styles.label_form}>{t("ISF")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your ISF",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="I_C"
                label={<p className={styles.label_form}>{t("I:C")}</p>}
                rules={[
                  {
                    required: true,
                    message: "Please input your I:C!",
                  },
                ]}
              >
                <Space align="start">
                  <Form.Item name="i" >
                <Input />
                  </Form.Item>
                <span >:</span>
                <Form.Item name="c" >
                <Input />
                </Form.Item>
                </Space>
              </Form.Item>
              <Form.Item
                name="slidingScale"
                label={
                  <p className={styles.label_form}>{t("Sliding scale")}</p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input your Sliding scale!",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </div>
          </Col>
          <Col lg={7} className={styles.patient_register_column}>
            <Text className={styles.title_form}>{t("Medical  Conditions")}</Text>
            <div className={styles.patient_register_column_wrapper}>
              <Form.Item
                name="healthIssues"
               
                className={styles.form_item}
                label={
                  <p className={styles.label_form}>
                    {t("Any other critical health issues?")}
                  </p>
                }
              >
                {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                <Checkbox.Group style={{textAlign: 'left'}}>
                  <Space direction="vertical">
                    <Checkbox value="Unawareness_hypoglycemia">
                      <p className={styles.label_form}>
                        {t("Unawareness hypoglycemia")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Insulin_resistance">
                      <p className={styles.label_form}>
                        {t("Insulin resistance")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Hypertension">
                      <p className={styles.label_form}>
                        {t("Hypertension")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Retinopathy">
                      <p className={styles.label_form}>{t("Retinopathy")}</p>
                    </Checkbox>
                    <Checkbox value="Other">
                      <p className={styles.label_form}>{t("Other")}</p>
                    </Checkbox>
                    <Form.Item name="otherHealthIssues">
                      <Input />
                    </Form.Item>
                  </Space>
                </Checkbox.Group>
              </Form.Item>

              <Form.Item
                name="diabetesComplications"
                className={styles.form_item}
                label={
                  <p className={styles.label_form}>
                    {t("Any Diabetes complications?")}
                  </p>
                }
              >
                {/* TO DO CHANGE ALIGN TEXT IF LANG CHANGE */}
                <Checkbox.Group style={{textAlign: 'left'}}>
                  <Space direction="vertical">
                    <Checkbox value="Hypoglycemia">
                      <p className={styles.label_form}>
                        {t("Hypoglycemia")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Diabetic_Ketoacidosis">
                      <p className={styles.label_form}>
                        {t("Diabetic Ketoacidosis")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Non_ketotic_Hyperosmolar_Diabetic_Syndrome_or_Com">
                      <p className={styles.label_form}>
                        {t("Non-ketotic Hyperosmolar Diabetic Syndrome or Com")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Lactic_Acidosis">
                      <p className={styles.label_form}>
                        {t("Lactic Acidosis")}
                      </p>
                    </Checkbox>
                    <Checkbox value="Microvascular">
                      <p className={styles.label_form}>
                        {t("Microvascular")}
                      </p>
                    </Checkbox>

                    <Checkbox value="Other">
                      <p className={styles.label_form}>{t("Other")}</p>
                    </Checkbox>
                    <Form.Item name="otherDiabetesComplications">
                      <Input />
                    </Form.Item>
                  </Space>
                </Checkbox.Group>
              </Form.Item>
              <Form.Item
                name="note"
                label={
                  <p className={styles.label_form}>
                    {t("Doctor recommendation & notes")}
                  </p>
                }
                rules={[
                  {
                    required: true,
                    message: "Please input patient age",
                  },
                ]}
              >
                <Input.TextArea autoSize={{ minRows: 4, maxRows: 6 }} />
              </Form.Item>
            </div>
          </Col>
        </Row>
        <Row type="flex" justify="center" align="middle">
        <Form.Item >
          <CustomButton
           htmlType="submit"
           text={t("Register")}
           className={`${styles.btn_text}`}
           loading={loading}
           />
        </Form.Item>
           </Row>
      </Form>
    </div>
  );
};

export default index;
