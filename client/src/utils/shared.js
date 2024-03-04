
export const ErrorFeedback = ({ isValid, value }) => {
    return !isValid && value ? (
        <div
            role="alert"
            className="invalid-feedback"
            style={{display: 'block'}}
        >Amount is Required, and must be a number</div>
    ) : null;
}

export const DEPOSIT = 'deposit';
export const WITHDRAWAL = 'withdrawal'