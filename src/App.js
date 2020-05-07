import React from 'react';
import './App.css';
import * as Yup from 'yup';
import { withFormik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

const App = ({
  values,
  setFieldValue,
  handleChange,
  errors,
}) => (
    <div className="head">
      <Form>
        <div className="App">
          <h1>Book your vacations here</h1>
          <div className="main-section">
            <div className="form-field">
              <Field type="radio" name="way" value={'oneway'} />
              <label className="rad" htmlFor="oneway">Oneway </label>
              <Field type="radio" name="way" value={'twoway'} />
              <label className="rad" htmlFor="twoway">Twoway </label>
              <div className="em"><ErrorMessage name="way" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="first_name">First Name  </label>
              <Field className="val" name="first_name" type="text" />
              <div className="em"><ErrorMessage name="first_name" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="last_name">Last Name  </label>
              <Field className="val" name="last_name" type="text" />
              <div className="em"><ErrorMessage name="last_name" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="source">Source  </label>
              <Field className="val" component="select" name="source"  >
                <option label="Select Source" />
                <option value="Ahmedabad" label="Ahmedabad" />
                <option value="Bangalore" label="Bangalore" />
                <option value="Chennai" label="Chennai" />
                <option value="Delhi" label="Delhi" />
                <option value="Jabalpur" label="Jabalpur" />
                <option value="Jaipur" label="Jaipur" />
                <option value="Kolkata" label="Kolkata" />
                <option value="Mumbai" label="Mumbai" />
              </Field>
              <div className="em"><ErrorMessage name="source" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="destination">Destination  </label>
              <Field className="val" component="select" name="destination"  >
                <option label="Select Destination" />
                <option value="Ahmedabad" label="Ahmedabad" />
                <option value="Bangalore" label="Bangalore" />
                <option value="Chennai" label="Chennai" />
                <option value="Delhi" label="Delhi" />
                <option value="Jabalpur" label="Jabalpur" />
                <option value="Jaipur" label="Jaipur" />
                <option value="Kolkata" label="Kolkata" />
                <option value="Mumbai" label="Mumbai" />
              </Field>
              <div className="em"><ErrorMessage name="destination" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="dot">Date of Travel  </label>
              <div className="val"><DayPickerInput
                format="D/M/YYYY"
                placeholder="DD/MM/YYYY"
                dayPickerProps={{
                  disabledDays: [
                    { before: new Date() },
                    { after: new Date(values.dor) }
                  ]
                }}
                onDayChange={e => setFieldValue('dot', e.toDateString())}
              />
              </div>
              <div className="em"><ErrorMessage name="dot" /></div>
            </div>

            <div>
              {values.way === 'twoway' && (
                <div className="form-field">
                  <label className="lab" htmlFor="dor">Date of Return  </label>
                  <div className="val">
                    <DayPickerInput
                      format="DD/MM/YYYY"
                      placeholder="DD/MM/YYYY"
                      dayPickerProps={{
                        disabledDays:
                          [
                            { before: new Date() },
                            { before: new Date(values.dot) }
                          ]
                      }}
                      onDayChange={e => setFieldValue('dor', e.toDateString())}
                    />
                  </div>
                  <div className="em"><ErrorMessage name="dor" /></div>
                </div>
              )}
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="adult">No. of Adult  </label>
              <input className="val" name="adult" type="number" value={values.adult} onChange={handleChange} />
              <div className="em"><ErrorMessage name="adult" /></div>
            </div>

            <div className="form-field">
              <label className="lab" htmlFor="children">No. of Children  </label>
              <input className="val" name="children" type="number" value={values.children} onChange={handleChange} /><br />
              <div className="em"><ErrorMessage name="children" /></div>
            </div>

            <div>
              <FieldArray
                name="child"
                render={arrayHelpers => (
                  <div className="form-field">
                    {values.child && values.children > 0 ? (
                      values.child.map((value, index) => (
                        <div key={index}>
                          <label className="lab" htmlFor="child">Enter Children Name </label><br />
                          <div>
                            <label htmlFor="child">{`${index + 1}`}</label>
                            <Field className="val" name={`child.${index}`} />
                            <button
                              type="button"
                              onClick={() => {
                                if (values.children !== 0 && values.child !== 0 && values.child.length > 1) {
                                  arrayHelpers.remove(index)
                                }
                              }
                              }>
                              -
                           </button>
                            <button
                              type="button"
                              onClick={() => {
                                if (values.child.length < values.children) {
                                  arrayHelpers.push('');
                                }
                                else
                                  errors.child = ""
                              }
                              }
                            >
                              +
                            </button>
                          </div>
                        </div>
                      ))
                    ) : null}
                  </div>
                )}
              />
              <div className="em"><ErrorMessage name="child" /></div>
            </div>

            <div className="form-field">
              <br />
              <button id="smt" type="submit"  >Submit</button>
            </div>
          </div>
          <h1>Visit again .</h1>
        </div>
      </Form>
    </div>
  )

export const FormikApp = withFormik({
  mapPropsToValues({ way, first_name, last_name, source, destination, dot, dor, adult, children, child }) {
    return {
      way: way,
      first_name: first_name || '',
      last_name: last_name || '',
      source: source || '',
      destination: destination || '',
      dot: dot || '',
      dor: dor || '',
      adult: adult || '',
      children: children || '',
      child: ['']
    }
  },

  validationSchema: Yup.object().shape({

    way: Yup.string()
      .required('Select any one'),

    first_name: Yup.string().required('First Name is required').test(
      "first_name",
      "First Name can contain only alphabets",
      val => {
        let regExp = new RegExp(
          "^[A-Za-z]+$"
        );
        return regExp.test(val);
      }
    ),

    last_name: Yup.string()
      .required('Last Name is required')
      .test(
        "last_name",
        "Last Name can contain only alphabets",
        val => {
          let regExp = new RegExp(
            "^[A-Za-z]+$"
          );
          return regExp.test(val);
        }
      ),

    source: Yup.string()
      .required('Source is required'),

    destination: Yup.string().required('Destination is required'),

    dot: Yup.date()
      .required('Date of travel  is required'),

    dor: Yup.date()
      .when('way', {
        is: "twoway",
        then: Yup.date().required('Date of return is Required'),
      }),

    adult: Yup.number()
      .min(1)
      .max(10)
      .required('Adults is required'),

    children: Yup.number()
      .min(0)
      .max(3)
      .required('For null enter 0'),

    child: Yup.array().of(Yup.string())

  }),

  handleSubmit(values) {
    console.log(values);
  },

  validate: values => {

    let errors = {};
    if (values.children > 0) {
      for (var i = 1; i <= values.child.length; i++) {
        if (values.child[i - 1] === "") {
          errors.child = "Name required"
        }
      }
    }

    if (values.children > 0) {
      for (var j = 1; j <= values.child.length; j++) {
        if (!(/^[a-zA-Z]+$/.test(values.child[j - 1]))) {
          errors.child = "Only alphabates allowed";
        }
      }
    }
    if (values.children > 0) {
      if (values.child.length !== values.children)
        errors.children = "No. of Children should be same as children name field "
    }
    if (values.adult < 2 * values.children)
      errors.children = "Atleast 2 adult required with 1 child";
    else if ((values.adult + values.children) > 10)
      errors.adult = "Total passengers cant be greater than 10 ";
    else if (values.source === values.destination && values.source !== '') {
      errors.destination = "Source and destination can't be same";
    }
    else if (values.way === "oneway")
      values.dor = "";
    return errors;
  }

})(App)