import { useEffect } from "react";
import { useRouter } from "next/router";
import { useAuth } from "@/hooks";

export function isAuth(Component: any) {
  return function IsAuth(props: any) {
    const { user } = useAuth();
    const { push } = useRouter();
    const auth = Boolean(user);

    useEffect(() => {
      if (!auth) {
        push("/signin");
      }
    }, []);

    if (!auth) {
      return null;
    }

    return <Component {...props} />;
  };
}
