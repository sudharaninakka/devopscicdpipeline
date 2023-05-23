import React, { useState, useEffect } from "react";
import "./form.css";
import { useNavigate } from "react-router-dom";
import { AiOutlineClose } from "react-icons/ai";
import { BsChevronLeft } from "react-icons/bs";

import { useFormik } from "formik";
import { InputText } from "primereact/inputtext";
import { Button } from "primereact/button";
import { Dropdown } from "primereact/dropdown";
import { Calendar } from "primereact/calendar";
import { Password } from "primereact/password";
import { Checkbox } from "primereact/checkbox";
import { Dialog } from "primereact/dialog";
import { Divider } from "primereact/divider";
import { classNames } from "primereact/utils";

import { InputTextarea } from "primereact/inputtextarea";

const Form = (props) => {
  const navigate = useNavigate();

  const [showMessage, setShowMessage] = useState(false);
  const [formData, setFormData] = useState({});

  const countries = [
    { name: "Afghanistan (+93) ", code: "+93" },
    // {"name": "Åland Islands", "code": "AX"},
    { name: "Albania (+355) ", code: "+355" },
    { name: "Algeria (+213) ", code: "+213" },
    { name: "American Samoa (+1-684) ", code: "+1-684" },
    { name: "Andorra (+376) ", code: "+376" },
    { name: "Angola (+244) ", code: "+244" },
    { name: "Anguilla (+1-264) ", code: "+1-264" },
    { name: "Antarctica (+672) ", code: "+672" },
    { name: "Antigua and Barbuda (+1-268) ", code: "+1-268" },
    { name: "Argentina (+54) ", code: "+54" },
    { name: "Armenia (+374) ", code: "+374" },
    { name: "Aruba (+297) ", code: "+297" },
    { name: "Australia (+61) ", code: "+61" },
    { name: "Austria (+43) ", code: "+43" },
    { name: "Azerbaijan (+994) ", code: "+994" },
    { name: "Bahamas (+1-242) ", code: "+1-242" },
    { name: "Bahrain (+973) ", code: "+973" },
    { name: "Bangladesh (+880) ", code: "+880" },
    { name: "Barbados (+1-246) ", code: "+1-246" },
    { name: "Belarus (+375) ", code: "+375" },
    { name: "Belgium (+32) ", code: "+32" },
    { name: "Belize (+501) ", code: "+501" },
    { name: "Benin (+229) ", code: "+229" },
    { name: "Bermuda (+1-441) ", code: "+1-441" },
    { name: "Bhutan (+975) ", code: "+975" },
    { name: "Bolivia (+591) ", code: "+591" },
    { name: "Bosnia and Herzegovina (+387) ", code: "+387" },
    { name: "Botswana (+267) ", code: "+267" },
    // {"name": "Bouvet Island (+) ", "code": "BV"},
    { name: "Brazil (+55) ", code: "+55" },
    { name: "British Indian Ocean Territory (+246) ", code: "+246" },
    // {"name": "Brunei Darussalam (+) ", "code": "BN"},
    { name: "Bulgaria (+359) ", code: "+359" },
    { name: "Burkina Faso (+226) ", code: "+226" },
    { name: "Burundi (+257) ", code: "+257" },
    { name: "Cambodia (+855) ", code: "+855" },
    { name: "Cameroon (+237) ", code: "+237" },
    { name: "Canada (+1) ", code: "+1" },
    { name: "Cape Verde (+238) ", code: "+238" },
    { name: "Cayman Islands (+1-345) ", code: "+1-345" },
    { name: "Central African Republic (+236) ", code: "+236" },
    { name: "Chad (+235) ", code: "+235" },
    { name: "Chile (+56) ", code: "+56" },
    { name: "China (+86) ", code: "+86" },
    { name: "Christmas Island (+61) ", code: "+61" },
    { name: "Cocos (Keeling) Islands (+61) ", code: "+61" },
    { name: "Colombia (+57) ", code: "+57" },
    { name: "Comoros (+269) ", code: "+269" },
    // {"name": "Congo", "code": "CG"},
    // {"name": "Congo, The Democratic Republic of the", "code": "CD"},
    { name: "Cook Islands (+682) ", code: "+682" },
    { name: "Costa Rica (+506) ", code: "+506" },
    // {"name": "Cote D\"Ivoire", "code": "CI"},
    { name: "Croatia (+385) ", code: "+385" },
    { name: "Cuba (+53) ", code: "+53" },
    { name: "Cyprus (+357) ", code: "+357" },
    { name: "Czech Republic (+420) ", code: "+420" },
    { name: "Denmark (+45) ", code: "+45" },
    { name: "Djibouti (+253) ", code: "+253" },
    { name: "Dominica (+1-767) ", code: "+1-767" },
    { name: "Dominican Republic (+1-809) ", code: "+1-809" },
    { name: "Ecuador (+593) ", code: "+593" },
    { name: "Egypt (+20) ", code: "+20" },
    { name: "El Salvador (+503) ", code: "+503" },
    { name: "Equatorial Guinea (+240) ", code: "+240" },
    { name: "Eritrea (+291) ", code: "+291" },
    { name: "Estonia (+372) ", code: "+372" },
    { name: "Ethiopia (+251) ", code: "+251" },
    { name: "Falkland Islands (Malvinas)(+500) ", code: "+500" },
    { name: "Faroe Islands (+298) ", code: "+298" },
    { name: "Fiji (+679) ", code: "+679" },
    { name: "Finland (+358) ", code: "+358" },
    { name: "France (+33) ", code: "+33" },
    // {"name": "French Guiana", "code": "GF"},
    { name: "French Polynesia (+689) ", code: "+689" },
    // {"name": "French Southern Territories", "code": "TF"},
    { name: "Gabon (+241) ", code: "+241" },
    { name: "Gambia (+220) ", code: "+220" },
    { name: "Georgia (+995) ", code: "+995" },
    { name: "Germany (+49) ", code: "+49" },
    { name: "Ghana (+233) ", code: "+233" },
    { name: "Gibraltar (+350) ", code: "+350" },
    { name: "Greece (+30) ", code: "+30" },
    { name: "Greenland (+299) ", code: "+299" },
    { name: "Grenada (+1-473) ", code: "+1-473" },
    // {"name": "Guadeloupe (+) ", "code": "GP"},
    { name: "Guam (+1-671) ", code: "+1-671" },
    { name: "Guatemala (+502) ", code: "+502" },
    { name: "Guernsey (+44-1481) ", code: "+44-1481" },
    { name: "Guinea (+224) ", code: "+224" },
    { name: "Guinea-Bissau (+245) ", code: "+245" },
    { name: "Guyana (+592) ", code: "+592" },
    { name: "Haiti (+509) ", code: "+509" },
    // {"name": "Heard Island and Mcdonald Islands", "code": "HM"},
    // {"name": "Holy See (Vatican City State)", "code": "VA"},
    { name: "Honduras (+504) ", code: "+504" },
    { name: "Hong Kong (+852) ", code: "+852" },
    { name: "Hungary (+36) ", code: "+36" },
    { name: "Iceland (+354) ", code: "+354" },
    { name: "India (+91) ", code: "+91" },
    { name: "Indonesia (+62) ", code: "+62" },
    { name: "Iran (+98) ", code: "+98" },
    { name: "Iraq (+964) ", code: "+964" },
    { name: "Ireland (+353) ", code: "+353" },
    { name: "Isle of Man (+44-1624) ", code: "+44-1624" },
    { name: "Israel (+972) ", code: "+972" },
    { name: "Italy (+39) ", code: "+39" },
    { name: "Jamaica (+1-876) ", code: "+1-876" },
    { name: "Japan (+81) ", code: "+81" },
    { name: "Jersey (+44-1534) ", code: "+44-1534" },
    { name: "Jordan (+962) ", code: "+962" },
    { name: "Kazakhstan (+7) ", code: "+7" },
    { name: "Kenya (+254) ", code: "+254" },
    { name: "Kiribati (+686) ", code: "+686" },
    // {"name": "Korea, Democratic People\"S Republic of", "code": "KP"},
    // {"name": "Korea, Republic of", "code": "KR"},
    { name: "Kuwait (+965) ", code: "+965" },
    { name: "Kyrgyzstan (+996) ", code: "+996" },
    // {"name": "Lao People\"S Democratic Republic", "code": "LA"},
    { name: "Latvia (+371) ", code: "+371" },
    { name: "Lebanon (+961) ", code: "+961" },
    { name: "Lesotho (+266) ", code: "+266" },
    { name: "Liberia (+231) ", code: "+231" },
    { name: "Libya (+218) ", code: "+218" },
    { name: "Liechtenstein (+423) ", code: "+218" },
    { name: "Lithuania (+370) ", code: "+370" },
    { name: "Luxembourg (+352) ", code: "+352" },
    { name: "Macao (+853) ", code: "+853" },
    { name: "Macedonia (+389) ", code: "+389" },
    { name: "Madagascar (+261)  ", code: "+261" },
    { name: "Malawi (+265) ", code: "+265" },
    { name: "Malaysia (+60) ", code: "+60" },
    { name: "Maldives (+960) ", code: "+960" },
    { name: "Mali (+223) ", code: "+223" },
    { name: "Malta (+356) ", code: "+356" },
    { name: "Marshall Islands (+692) ", code: "+692" },
    // {"name": "Martinique", "code": "MQ"},
    { name: "Mauritania (+222) ", code: "+222" },
    { name: "Mauritius (+230) ", code: "+230" },
    { name: "Mayotte (+262) ", code: "+262" },
    { name: "Mexico (+52) ", code: "+52" },
    { name: "Micronesia (+691) ", code: "+691" },
    { name: "Moldova (+373) ", code: "+373" },
    { name: "Monaco (+377) ", code: "+377" },
    { name: "Mongolia (+976) ", code: "+976" },
    { name: "Montserrat (+1-664) ", code: "+1-664" },
    { name: "Morocco (+212) ", code: "+212" },
    { name: "Mozambique (+258) ", code: "+258" },
    { name: "Myanmar (+95) ", code: "+95" },
    { name: "Namibia (+264) ", code: "+264" },
    { name: "Nauru (+674) ", code: "+674" },
    { name: "Nepal (+977) ", code: "+977" },
    { name: "Netherlands (+31) ", code: "+31" },
    { name: "Netherlands Antilles (+599) ", code: "+599" },
    { name: "New Caledonia (+687) ", code: "+687" },
    { name: "New Zealand (+64) ", code: "+64" },
    { name: "Nicaragua (+505) ", code: "+505" },
    { name: "Niger (+227) ", code: "+227" },
    { name: "Nigeria (+234) ", code: "+234" },
    { name: "Niue (+683) ", code: "+683" },
    // {"name": "Norfolk Island", "code": "NF"},
    { name: "Northern Mariana Islands (+1-670) ", code: "+1-670" },
    { name: "Norway (+47) ", code: "+47" },
    { name: "Oman (+968) ", code: "+968" },
    { name: "Pakistan (+92) ", code: "+92" },
    { name: "Palau (+680) ", code: "+680" },
    { name: "Palestinie (+970) ", code: "+970" },
    { name: "Panama (+507) ", code: "+507" },
    { name: "Papua New Guinea (+675) ", code: "+675" },
    { name: "Paraguay (+595) ", code: "+595" },
    { name: "Peru (+51) ", code: "+51" },
    { name: "Philippines (+63) ", code: "+63" },
    { name: "Pitcairn (+64) ", code: "+64" },
    { name: "Poland (+48) ", code: "+48" },
    { name: "Portugal (+351) ", code: "+351" },
    { name: "Puerto Rico (+1-789) ", code: "+1-789" },
    { name: "Qatar (+974) ", code: "+974" },
    { name: "Reunion (+262) ", code: "+262" },
    { name: "Romania (+40) ", code: "+40" },
    { name: "Russian (+7) ", code: "+7" },
    { name: "RWANDA (+250) ", code: "+250" },
    { name: "Saint Helena (+290) ", code: "+290" },
    { name: "Saint Kitts and Nevis (+1-869) ", code: "+1-869" },
    { name: "Saint Lucia (+1-758) ", code: "+1-758" },
    { name: "Saint Pierre and Miquelon (+508) ", code: "+508" },
    { name: "Saint Vincent and the Grenadines (+1-784) ", code: "+1-784" },
    { name: "Samoa (+685) ", code: "+685" },
    { name: "San Marino (+378) ", code: "+378" },
    { name: "Sao Tome and Principe (+239) ", code: "+239" },
    { name: "Saudi Arabia (+966) ", code: "+966" },
    { name: "Senegal (+221) ", code: "+221" },
    { name: "Serbia (+381) ", code: "+381" },
    { name: "Seychelles (+248) ", code: "+248" },
    { name: "Sierra Leone (+232) ", code: "+232" },
    { name: "Singapore (+65) ", code: "+65" },
    { name: "Slovakia (+421) ", code: "+421" },
    { name: "Slovenia (+386) ", code: "+386" },
    { name: "Solomon Islands (+677) ", code: "+677" },
    { name: "Somalia (+252) ", code: "+252" },
    { name: "South Africa (+27) ", code: "+27" },
    // {"name": "South Georgia and the South Sandwich Islands", "code": "GS"},
    { name: "Spain (+34) ", code: "+34" },
    { name: "Sri Lanka (+94) ", code: "+94" },
    { name: "Sudan (+549) ", code: "+549" },
    { name: "Suriname (+597) ", code: "+597" },
    // {"name": "Svalbard and Jan Mayen", "code": "SJ"},
    // {"name": "Swaziland", "code": "SZ"},
    // {"name": "Sweden", "code": "SE"},
    { name: "Switzerland (+41) ", code: "+41" },
    { name: "Syria (+963) ", code: "+963" },
    { name: "Taiwan (+886) ", code: "+886" },
    { name: "Tajikistan (+992) ", code: "+992" },
    { name: "Tanzania (+255) ", code: "+255" },
    { name: "Thailand (+66) ", code: "+66" },
    // {"name": "Timor-Leste", "code": "TL"},
    { name: "Togo (+676) ", code: "+TG" },
    // {"name": "Tokelau", "code": "TK"},
    // {"name": "Tonga", "code": "TO"},
    { name: "Trinidad and Tobago (+1-868) ", code: "+1-868" },
    { name: "Tunisia (+216) ", code: "+216" },
    { name: "Turkey (+90) ", code: "+90" },
    { name: "Turkmenistan (+993) ", code: "+993" },
    { name: "Turks and Caicos Islands (+1-649) ", code: "+1-649" },
    { name: "Tuvalu (+688) ", code: "+688" },
    { name: "Uganda (+256) ", code: "+256" },
    { name: "Ukraine (+380) ", code: "+380" },
    { name: "United Arab Emirates (+971) ", code: "+971" },
    { name: "United Kingdom (+44) ", code: "+44" },
    { name: "United States (+1) ", code: "+1" },
    // {"name": "United States Minor Outlying Islands", "code": "UM"},
    { name: "Uruguay (+598) ", code: "+598" },
    { name: "Uzbekistan (+998) ", code: "+998" },
    { name: "Vanuatu (+678) ", code: "+678" },
    { name: "Venezuela (+58) ", code: "+58" },
    { name: "VietNam (+84) ", code: "+84" },
    // {"name": "Virgin Islands, British", "code": "VG"},
    // {"name": "Virgin Islands, U.S.", "code": "VI"},
    { name: "Wallis and Futuna (+681) ", code: "+681" },
    { name: "Western Sahara (+212) ", code: "+212" },
    { name: "Yemen (+967) ", code: "+967" },
    { name: "Zambia (+260) ", code: "+260" },
    { name: "Zimbabwe (+263) ", code: "+263" },
  ];

  const formik = useFormik({
    initialValues: {
      name: "",
      lastname: "",
      email: "",
      phone: "",
      company: "",
      designation: "",
      country: "",
      comment: "",
    },
    validate: (data) => {
      let errors = {};

      if (!data.name) {
        errors.name = "Name is required.";
      }
      // if (!data.lastname) {
      //   errors.lastname = "Last Name is required.";
      // }
      let strPhone = data.phone.toString();
      // console.log("strPhone-",strPhone);
      // if(strPhone.length !==10){
      //   console.log('hi');
      // }
      if (!data.phone || strPhone.length !== 10) {
        errors.phone = "Phone is required.";
      }
      // console.log("coundtry code", data.country);

      if (!data.company) {
        errors.company = "Company name is required.";
      }
      if (!data.designation) {
        errors.designation = "Designation is required.";
      }
      if (!data.country) {
        errors.country = "Country Phone Code is required.";
      }

      if (
        !data.email ||
        data.email.includes("gmail") ||
        data.email.includes("yahoo") ||
        data.email.includes("outlook")
      ) {
        errors.email =
          "Email is required. Please use your company email (Gmail, Yahoo... not accepted).";
      }
      return errors;
    },
    onSubmit: (data) => {
      setFormData(data);
      setShowMessage(true);

      // console.log(
      //   "country code ",
      //   JSON.stringify(data.country.code) + data.phone.toString(),
      //   typeof data.phone.toString()
      // );
      let phonecode = JSON.stringify(data.country.code) + data.phone.toString();
      // console.log("phone code", phonecode, typeof phonecode);
      let newPhone = "";
      for (let i = 0; i < phonecode.length; i++) {
        if (phonecode[i] !== '"') {
          newPhone += phonecode[i];
        }
      }
      // console.log("newPhone", newPhone);
      localStorage.setItem(
        "userDetails",
        JSON.stringify({
          firstName: data.name,
          lastName: data.lastname,
          phone: newPhone,
          email: data.email,
          company: data.company,
          des: data.designation,
          comment: data.comment,
        })
      );
      navigate("/last");
      // formik.resetForm();
    },
  });
  const isFormFieldValid = (name) =>
    !!(formik.touched[name] && formik.errors[name]);
  const getFormErrorMessage = (name) => {
    return (
      isFormFieldValid(name) && (
        <small className="p-error">{formik.errors[name]}</small>
      )
    );
  };
  function closeForm() {
    props.backForm(false);
  }
  return (
    <div className="form-fully">
      <form onSubmit={formik.handleSubmit} className="p-fluid">
        <div className="each-flex-row">
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="name"
                name="name"
                value={formik.values.name}
                onChange={formik.handleChange}
                autoFocus
                className={classNames({
                  "p-invalid": isFormFieldValid("name"),
                })}
              />
              <label
                htmlFor="name"
                className={classNames({ "p-error": isFormFieldValid("name") })}
              >
                First Name*
              </label>
            </span>
            {getFormErrorMessage("name")}
          </div>
          <div className="field">
            <span className="p-float-label">
              <InputText
                id="name"
                name="lastname"
                value={formik.values.lastname}
                onChange={formik.handleChange}
                // className={classNames({
                //   "p-invalid": isFormFieldValid("lastname"),
                // })}
              />
              <label
                htmlFor="lastname"
                // className={classNames({
                //   "p-error": isFormFieldValid("lastname"),
                // })}
              >
                Last Name
              </label>
            </span>
            {/* {getFormErrorMessage("lastname")} */}
          </div>
        </div>

        <div className="each-flex-row">
          <div className="fielding1 field">
            <div className="field field12 ">
              <span className="p-float-label">
                <Dropdown
                  id="country"
                  name="country"
                  value={formik.values.country}
                  onChange={formik.handleChange}
                  options={countries}
                  optionLabel="name"
                  className={classNames({
                    "p-invalid": isFormFieldValid("country"),
                  })}
                />
                <label
                  htmlFor="country"
                  className={classNames({
                    "p-error": isFormFieldValid("country"),
                  })}
                >
                  Country code*
                </label>
              </span>
            </div>
            <div className="field field12 field123">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-phone" />
                <InputText
                  id="email"
                  name="phone"
                  type="number"
                  value={formik.values.phone}
                  onChange={formik.handleChange}
                  // maxLength={10}
                  // min="-999"
                  // max="999"
                  className={classNames({
                    "p-invalid": isFormFieldValid("phone"),
                  })}
                />
                <label
                  htmlFor="phone"
                  className={classNames({
                    "p-error": isFormFieldValid("phone"),
                  })}
                >
                  Phone No*
                </label>
              </span>
              {getFormErrorMessage("phone")}
            </div>
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              <i className="pi pi-envelope" />
              <InputText
                id="email"
                name="email"
                value={formik.values.email}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("email"),
                })}
              />
              <label
                htmlFor="email"
                className={classNames({ "p-error": isFormFieldValid("email") })}
              >
                Email*
              </label>
            </span>
            {getFormErrorMessage("email")}
          </div>
        </div>
        <div className="each-flex-row">
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              {/* <i className="pi pi-envelope" /> */}
              <InputText
                id="email"
                name="company"
                value={formik.values.company}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("company"),
                })}
              />
              <label
                htmlFor="company"
                className={classNames({
                  "p-error": isFormFieldValid("company"),
                })}
              >
                Company*
              </label>
            </span>
            {getFormErrorMessage("company")}
          </div>
          <div className="field">
            <span className="p-float-label p-input-icon-right">
              {/* <i className="pi pi-envelope" /> */}
              <InputText
                id="email"
                name="designation"
                value={formik.values.designation}
                onChange={formik.handleChange}
                className={classNames({
                  "p-invalid": isFormFieldValid("designation"),
                })}
              />
              <label
                htmlFor="designation"
                className={classNames({
                  "p-error": isFormFieldValid("designation"),
                })}
              >
                Designation*
              </label>
            </span>
            {getFormErrorMessage("designation")}
          </div>
        </div>
        <div className="com-last">
          <InputTextarea
            rows={3}
            cols={20}
            className="bg-text12"
            name="comment"
            placeholder="Write Your Feedback"
            value={formik.values.comment}
            onChange={formik.handleChange}
          />
        </div>
        <div className="btn-form-last1">
          <div className="btn-form-last">
            <Button
              label="Review"
              type="submit" ///
              icon="pi pi-angle-left"
              onClick={() => {
                closeForm();
                props.view(false);
              }}
              className="mt-2 edit-fin editing"
            />
            <Button
              type="submit"
              label="Submit"
              className="mt-2 complete-fin"
            />
          </div>
        </div>
      </form>
    </div>
  );
};

export default Form;
