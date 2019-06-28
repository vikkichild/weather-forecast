import React from "react";
import Alert from "react-bootstrap/Alert";

function ErrorAlert() {
    return (
        <Alert variant="danger">
            <Alert.Heading>Something is wrong!</Alert.Heading>
            <p>Please, reload the page and try again.</p>
        </Alert>
    );
};

export default ErrorAlert;

