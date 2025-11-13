// components/BackButton.tsx (or directly in your page.tsx if it's a client component)
'use client'; // This component must be a client component

import { useRouter } from 'next/navigation'; // Import useRouter from App Router
import Button from '@mui/material/Button';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

export default function BackButton({path}: {path:string}) {
  const router = useRouter();

  const handleGoBack = () => {

    if(path != ''){
      // Navigate to the new path
      router.push(path);
    }else{
      router.back(); // Navigates back in the browser history
    }
    
    
  };

  return (
    <Button
      variant="outlined" // Or 'contained', 'text'
      startIcon={<ArrowBackIcon />} // Icon on the left
      onClick={handleGoBack}
      sx={{ mt: 2, mb: 2 }} // Example MUI System styling for margin
    >
      Go Back
    </Button>
  );
}