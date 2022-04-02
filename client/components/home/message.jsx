
export const Message = ({message}) => {
    return (

        <div className="message">
        <div className="user-style">
                {message.userName}
        </div>

            <div className="message-text">
                {message.message}
            </div>
        </div>
        
    );
}