import '../styles/components/Input.css'

interface InputProps{
    isRequired?: boolean,
    type?: string,
    id?: string,
    name?: string,
    placeholder?: string,
    value?: string,
    callBack: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export default function Input({ isRequired, type, id, name, placeholder, value, callBack }: InputProps){
    return (
        <input className="input-field" type={type || 'text'} id={id || undefined} value={value} name={name || undefined} onChange={(event) => callBack(event)} placeholder={placeholder || ''} required={isRequired} />
    )
}