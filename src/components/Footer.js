import Input from './Input';
const Footer = ({ input, sendMessage, title }) => {
    return (
        <footer className='main-footer'>
            {input && <Input sendMessage={sendMessage} />}
            {title && <h3>Ja sam footer</h3>}
        </footer>
    );
};

export default Footer;
