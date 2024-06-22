import TextInputScss from "./TextInput.module.scss";

interface ITextInput {
  value: string;
  onFocus?: () => void;
  onBlur: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  iconComponent?: React.ReactNode;
  width?: string;
  border?: string;
  type?: string;
}

const TextInput = ({
  value,
  onFocus,
  onBlur,
  placeholder,
  onChange,
  iconComponent,
  width,
  border,
  type,
}: ITextInput) => {
  return (
    <label
      className={TextInputScss.optionSelector}
      style={{ width: width, border: border }}
    >
      <input
        value={value}
        onFocus={onFocus}
        onBlur={onBlur}
        placeholder={placeholder}
        onChange={onChange}
        type={type}
      ></input>
      {iconComponent}
    </label>
  );
};

export default TextInput;
