const FormBlockButton= (props) => (
    <div className="mt-3 text-end">
          <button type={props.type} className={props.name}>
            {props.label}
          </button>
    </div>
);
export default FormBlockButton;