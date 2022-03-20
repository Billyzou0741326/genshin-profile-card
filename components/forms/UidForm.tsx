import { Formik } from "formik";

const UidForm = (): JSX.Element => {
  return (
    <>
      {/* Uid */}
      <Formik
        initialValues={{ uid: "" }}
        validate={(values) => {
          const errors: any = {};
          if (!values.uid) {
            errors.uid = "* Required";
          } else if (!/^[0-9]+$/.test(values.uid)) {
            errors.uid = "* Invalid uid";
          }
          return errors;
        }}
        onSubmit={(values, { setSubmitting }) => {
          console.log(`Form submitted - uid: ${values.uid}`);
          setSubmitting(false);
        }}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit} className="flex flex-col gap-2">
            <label>
              <span className="text-sm font-medium text-gray-400">UID</span>
              <input
                type="text"
                name="uid"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.uid}
                className={`w-32 block mt-1 px-3 py-2 bg-white rounded-md text-sm shadow-sm border-gray-200 border
                  focus:outline-none focus:border-sky-500 focus:border`}
              />
              {/* errors */}
              <div className="text-xs text-red-500 h-2">{errors.uid}</div>
            </label>
            {/* submit button */}
            <button
              type="submit"
              disabled={isSubmitting}
              className={`text-sm uppercase leading-3 text-blue-600 bg-blue-200 dark:bg-blue-300
                hover:text-white hover:bg-blue-400 hover:dark:bg-blue-500
                py-2 px-4 rounded-md ease-in-out duration-300`}
            >
              Submit
            </button>
          </form>
        )}
      </Formik>
    </>
  );
};

export default UidForm;
