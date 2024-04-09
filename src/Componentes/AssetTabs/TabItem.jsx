import { Link } from "react-router-dom";
import './Styles.css';

const AppTab = ({label, link, selected, disabled, clicked}) =>
{
    const isSelected = selected === label;

    if(disabled)
        return(
            <div className="Tab disabled" to= ''>
                {label}
            </div>
        );
    else
        return(
            <Link onClick={()=> clicked(label)} className={isSelected? 'Tab selected' : 'Tab'} to= {link}>
                {label}
            </Link>
        );
    }

export default AppTab;