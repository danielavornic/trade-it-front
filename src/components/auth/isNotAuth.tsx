import { useEffect } from "react";
import { useRouter } from "next/router";
import Cookies from "js-cookie";

import { useAuth } from "@/hooks";
import { decodeToken } from "react-jwt";

export function isNotAuth(Component: any) {
  return function IsNotAuth(props: any) {
    const { user } = useAuth();
    const { push } = useRouter();

    useEffect(() => {
      const token = Cookies.get("token");
      if (token) {
        push("/");
      }
    }, []);

    if (Boolean(user)) {
      return null;
    }

    return <Component {...props} />;
  };
}
