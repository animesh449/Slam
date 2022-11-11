import PropTypes from 'prop-types';
export default function Image({src, caption})
{
    return ( <div className="w-full"><img clasName='max-h-30'src={src} alt={caption}/></div>)
}

Image.propTypes={
    src: PropTypes.string.isRequired,
    caption: PropTypes.string.isRequired
}