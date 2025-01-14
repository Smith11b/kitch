const landerService = {

    saveEmailAddress: async (emailAddress: string) => {
        try {
            const response = await fetch('/api/email', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email: emailAddress }),
            });

            if (!response.ok) {
                throw new Error('Failed to submit email');
            }

            return await response.json();
        } catch (error) {
            console.error('Error submitting email:', error);
            return null;
        }
    },

    validateEmail: (email: string) => {
        const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]{2,})+$/;
        return re.test(String(email).toLowerCase());
      }
}

export default landerService;
