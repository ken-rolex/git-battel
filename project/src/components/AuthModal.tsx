import { SignIn } from '@clerk/clerk-react';

const AuthModal: React.FC = () => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-md relative overflow-hidden">
        <SignIn 
          appearance={{
            elements: {
              rootBox: "w-full max-w-full sm:mx-auto",
              card: "bg-transparent shadow-none p-0 sm:p-4",
              headerTitle: "text-2xl font-bold text-center text-gray-900 dark:text-white",
              headerSubtitle: "text-center text-gray-600 dark:text-gray-300",
              socialButtonsBlockButton: "w-full rounded-lg",
              formButtonPrimary: "w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-2",
              footerActionLink: "text-blue-600 hover:text-blue-700",
              formFieldInput: "w-full rounded-lg border border-gray-300 dark:border-gray-600 p-2",
              dividerLine: "bg-gray-200 dark:bg-gray-700",
              dividerText: "text-gray-500 dark:text-gray-400",
              identityPreviewText: "text-gray-700 dark:text-gray-300",
              formFieldLabel: "text-gray-700 dark:text-gray-300",
              socialButtonsProviderIcon: "w-5 h-5",
              alert: "rounded-lg"
            },
            layout: {
              socialButtonsPlacement: "bottom",
              showOptionalFields: false
            }
          }}
        />
      </div>
    </div>
  );
};

export default AuthModal;