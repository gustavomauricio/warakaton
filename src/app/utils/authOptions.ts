import type { AuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";



export const authOptions: AuthOptions = {
    providers: [
      TwitterProvider({
        clientId: process.env.TWITTER_ID as string,
        clientSecret: process.env.TWITTER_SECRET as string,
      }),
    ],
    callbacks: {
      async signIn({ profile }) {
        
        if (profile) {
          const { screen_name, description } = profile as {
            screen_name: string;
            description: string;
          };
  
          if (description.length === 42 && description.startsWith("0x")) {
              const apiUrl = `${
                  process.env.API_URL
                }/submit_twitter_handle?address=${encodeURIComponent(
                    description
                    )}&twitter_handle=${encodeURIComponent(screen_name)}&twitter_token=123`;
            try {
              console.log(apiUrl);
              const response = await fetch(apiUrl, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
              });
  
              const data = await response.json();
              console.log("Response data:", data);
            } catch (error) {
              console.error("Error submitting Twitter handle:", error);
            }
          }
        }
  
        return true;
      },
    },
    session: { strategy: "jwt" },
  };