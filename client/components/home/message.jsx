
export const Message = ({message}) => {
    return (
        <div>
            {message.time}
            {message.message}
            {message.userName}
        </div>
    );
}