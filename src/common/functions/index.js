// Common functions
const handleError = (errors) => {
    return errors?.map(error => {
        return {
            type: error?.context?.key,
            message: error?.message
        }
    })
};

module.exports = {
    handleError
};