/**
 * @file executeAction.ts
 * @description  Executes the action and returns the result
 * @copyright Copyright (c) 2025 Arun Gopi
 * @author Arun Gopi 
 * @date 2025-02-22
 * @module SignUp
 *
 * @remarks
 * @see
 *
 */

import { isRedirectError } from "next/dist/client/components/redirect-error";

type Options<T> = {
  actionFn: () => Promise<T>;
  successMessage?: string;
};

const executeAction = async <T>({
  actionFn,
  successMessage = "The actions was successful",
}: Options<T>): Promise<{ success: boolean; message: string }> => {
  try {
    await actionFn();
    
    return {
      success: true,
      message: successMessage,
    };
  } catch (error) {
    if (isRedirectError(error)) {
      console.error("Redirect Error");
      throw error;
    }else{
      console.error("Not Redirect Error");
    }
    
    // TODO: Return contextual error
    return {
      success: false,
      message: "An error has occurred during executing the action",
    };
  }
};

export { executeAction };