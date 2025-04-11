import styles from "./Select.module.css";

interface Option {
  value: string;
  label: string;
}

interface PropsTypes {
  label?: string;
  name: string;
  id: string;
  required?: boolean;
  className?: string;
  options: Option[];
}

const Select = (props: PropsTypes) => {
  const { label, name, id, required = false, className, options } = props;
  return (
    <label htmlFor={id} className={styles.label}>
      {label}
      <select id={id} className={`${styles.select} ${className}`} name={name} required={required}>
        {options.map((option: Option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
};

export default Select;
