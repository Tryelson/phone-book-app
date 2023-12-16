import '../styles/components/Label.css'

interface LabelProps {
    isRequired?: boolean,
    name: string,
    htmlFor: string
}

export default function Label({ isRequired, name, htmlFor }: LabelProps){

    return (
        <label className="label-form" htmlFor={htmlFor}>
            { name }
            {isRequired && (<span className="text-danger">*</span>)}
        </label>
    )
}