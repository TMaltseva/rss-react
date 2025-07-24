import '../styles/components/ErrorMessage.css';

interface ErrorMessageProps {
  message: string;
}

const ErrorMessage = ({ message }: ErrorMessageProps) => {
  return (
    <div className="error-container">
      <p>{message}</p>
    </div>
  );
};

export default ErrorMessage;
