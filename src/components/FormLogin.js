import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import yup from "./YupGlobal";
import { GrClose } from "react-icons/gr";
import { http } from "../api/http";
import { isEmpty } from "lodash";
import { setAccessToken } from "../utils/cookieStorage";
import { useSelector, useDispatch } from "react-redux";
import {
  closeSigninModal,
  openLoginModal,
  openSignUpModal,
} from "../features/modal/modalSlice";
import { setUserData } from "../features/auth/authSlice";
const schema = yup
  .object({
    firstName: yup.string().min(1),
    lastName: yup.string().min(1),
    email: yup.string().email().required(),
    password: yup.string().min(8).max(30).required(),
    chooseCb: yup.string(),
  })
  .required();

export default function Login() {
  const dispatch = useDispatch();
  const { isOpenLogin } = useSelector((state) => state.modal);

  const handOpenClose = () => {
    dispatch(closeSigninModal());
  };
  const handOpenLogin = async () => {
    await dispatch(closeSigninModal());
    dispatch(openSignUpModal());
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  // *handle open Modal
  const onSubmit = async (data) => {
    try {
      const {
        data: { _id, token, username, lastname, email },
      } = await http.request({
        method: "POST",
        url: "/auth/login",
        data: { ...data },
      });

      if (isEmpty(token)) return console.log("Dang nhap that bai");
      else {
        console.log("dang nhap thanh cong");
        setAccessToken(token);
        dispatch(setUserData({ _id, token, username, lastname, email }));
        dispatch(closeSigninModal());
        window.location.reload();
      }
    } catch (error) {
      throw new Error(error);
    }
  };
  return (
    <section className="form">
      <div className={`form-overlay ${isOpenLogin ? "showModal-Form" : ""}`}>
        <div className="form-box grid-1">
          <div className="form-ic">
            <GrClose onClick={handOpenClose} />
          </div>
          <form className="form-right" onSubmit={handleSubmit(onSubmit)}>
            <div className="form-left">
              <h4 className="form-title">
                Sonw <span>Khan's</span>
              </h4>
              <p className="form-content">
                JOIN OUR RED TAB™ PROGRAM AND GET FREE SHIPPING ON EVERY ORDER.
              </p>
            </div>

            <div className="form-item">
              <label htmlFor="email">Email*</label>
              <input {...register("email")} />
              <p className="form-error">{errors.email?.message}</p>
            </div>
            <div className="form-item">
              <label htmlFor="password">Password*</label>
              <input {...register("password")} type="password" />
              <p className="form-error">{errors.password?.message}</p>
            </div>
            <p className="form-password">
              Passwords must be at least 8 characters and can't be easy to guess
              - commonly used or risky passwords are not permitted.
            </p>
            <div className="form-checkbox">
              <input {...register("chooseCb")} type="checkbox" />

              <label htmlFor="checkbox">
                Send me news & offers from Levi's®.
              </label>
            </div>
            <p className="form-error">{errors.chooseCb?.message}</p>
            <div className="form-contact">
              By creating an account, I agree to the
              <a href="/" className="form-link">
                LS&Co. Terms of Use
              </a>
              and the Red Tab
              <a href="/" className="form-link">
                Member Program Terms and Conditions
              </a>
              . I have read the
              <a href="/" className="form-link">
                LS&Co. Privacy Policy
              </a>
              and
              <a href="/" className="form-link">
                Financial Incentive Notice and offer terms.
              </a>
            </div>
            <input className="form-submit" type="submit" value="Join" />
            <span className="form-under" onClick={handOpenLogin}>
              Log in with an existing account
            </span>
          </form>
        </div>
      </div>
    </section>
  );
}
