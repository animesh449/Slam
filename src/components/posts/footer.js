import PropTypes from 'prop-types';

export default function Footer ({caption, username})
{
    return (
        <div className="p-4 pt-2 pb-0 font-bold flex justify-center">
        
        <span>--{caption}--</span>
    </div>)
}



Footer.propTypes={
    caption: PropTypes.string.isRequired,
    username: PropTypes.string.isRequired
} 