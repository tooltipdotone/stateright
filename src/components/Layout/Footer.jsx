"use client";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import bg from "../../../public/assets/NewBG.png";
import { FaFacebook, FaLinkedin, FaPinterest } from "react-icons/fa";
import { FaInstagram, FaSquareXTwitter } from "react-icons/fa6";
import { SlLocationPin } from "react-icons/sl";
import { RiMailSendFill } from "react-icons/ri";
import { BiPhoneCall } from "react-icons/bi";
import googleDownload from "../../../public/assets/Google Download.svg";
import appleDownload from "../../../public/assets/iOS Download.svg";
import { usePathname } from "next/navigation";
import { placeholderImage, t } from "@/utils";
import { settingsData } from "@/redux/reuducer/settingSlice";
import { useSelector } from "react-redux";

const Footer = () => {
  const pathname = usePathname();
  const isLandingPage = pathname === "/home";
  const [showDownloadLinks, setShowDownloadLinks] = useState(false);
  const systemSettingsData = useSelector(settingsData);
  const settings = systemSettingsData?.data;
  const currentYear = new Date().getFullYear();

  const showGetInTouchSection =
    settings?.company_address ||
    settings?.company_email ||
    settings?.company_tel1;
  useEffect(() => {
    if (
      settings?.play_store_link &&
      settings?.app_store_link &&
      isLandingPage
    ) {
      setShowDownloadLinks(true);
    } else {
      setShowDownloadLinks(false);
    }
  }, [settings, isLandingPage]);

  return (
    <section
      className="main_footer"
      style={{ marginTop: showDownloadLinks ? "200px" : "60px" }}
    >
      <div className="container">
        {showDownloadLinks ? (
          <div
            className="eClassifyApp"
            style={{
              background: `url(${bg.src})`,
              backgroundSize: "cover",
            }}
          >
            <div className="details">
              <div className="social_text">
                <span>
                  {t("experienceTheMagic")} {settings?.company_name} {t("app")}
                </span>
              </div>
              <div className="social_links">
                {settings?.app_store_link && (
                  <Link href={settings?.play_store_link}>
                    <Image
                      src={googleDownload}
                      alt="google"
                      width={0}
                      height={0}
                      className="google"
                      onErrorCapture={placeholderImage}
                    />
                  </Link>
                )}
                {settings?.app_store_link && (
                  <Link href={settings?.app_store_link}>
                    <Image
                      src={appleDownload}
                      alt="apple"
                      width={0}
                      height={0}
                      className="apple"
                      onErrorCapture={placeholderImage}
                    />
                  </Link>
                )}
              </div>
              {/* </div> */}
            </div>
          </div>
        ) : null}

        <div className="row" id="footer_deatils">
          <div className="col-6 col-md-6 col-lg-2 " >
            <div id="footer_logo_section">
              <Link href={`${isLandingPage ? "/home" : "/"}`}>
                <Image
                  loading="lazy"
                  src="public/assets/logo.svg"
                  alt="eclassify_logo"
                  width={0}
                  height={0}
                  // className="footer_logo"
                  onErrorCapture={placeholderImage}
                />
              </Link>
            </div>
            <div className="app_decs">
              {/* <p>{settings?.footer_description}</p> */}
            </div>
            <div className="social_media">
              <a href={settings?.facebook_link}>
                <button>
                  <FaFacebook size={22} />
                </button>
              </a>

              <a href={settings?.x_link}>
                <button>
                  <FaSquareXTwitter size={22} />
                </button>
              </a>

              <a href={settings?.linkedin_link}>
                <button>
                  <FaLinkedin size={22} />
                </button>
              </a>
            </div>
          </div>

          <div className="col-6 col-md-6 col-lg-2 ">
            <div className="quick_links_section">
              <div className="footer_headlines">
                <span>{t("orders")}</span>
              </div>
              <div className="footer_links">
                <Link href={"/profile/edit-profile"}>
                  <span>{t("myAccount")}</span>
                </Link>
              </div>
              <div className="footer_links">
                <Link href={"/pages/how-do-i-order"}>
                  <span>{t("howDoIOrder")}</span>
                </Link>
              </div>
              <div className="footer_links">
                <Link href={"/pages/payment-methods"}>
                  <span>{t("paymentMethods")}</span>
                </Link>
              </div>
            </div>
          </div>
          
          <div className="col-6 col-md-6 col-lg-2 ">
            <div className="quick_links_section">
              <div className="footer_headlines">
                <span>{t("support")}</span>
              </div>
              <div className="footer_links">
                <Link href={"/pages/refund-policy"}>
                  <span>{t("refundPolicy")}</span>
                </Link>
              </div>
              <div className="footer_links">
                <Link href={"/pages/privacy-policy"}>
                  <span>{t("privacyPolicy")}</span>
                </Link>
              </div>
              <div className="footer_links">
                <Link href={"/pages/terms-and-conditions"}>
                  <span>{t("termsAndConditions")}</span>
                </Link>
              </div>
            </div>
          </div>

          {showGetInTouchSection && (
            <div className="col-6 col-md-6 col-lg-2">
              <div className="get_in_touch_section">
                <div className="footer_headlines">
                  <span>{t("explore")}</span>
                </div>

                <div className="contact_details">
                  {/* <div className="details_icon">
                                            <SlLocationPin size={22} />
                                        </div> */}
                  <div className="footer_links">
                   <Link href={"/pages/shipping"}>
                     <span>{t("shipping")}</span>
                   </Link>
                  </div>
                </div>

                {settings?.company_email && (
                  <div className="contact_details">
                
                    <div className="footer_links">
                      <Link href={"/blogs"}>
                        <span>{t("smartyBlog")}</span>
                      </Link>
                    </div>
                  </div>
                )}

                {settings?.company_tel1 && (
                  <div className="contact_details">
                    {/* <div className="details_icon">
                                            <BiPhoneCall size={22} />
                                        </div> */}
                    {/* <div className="details_list">
                                            <a href={`tel:${settings?.company_tel1}`}>
                                                <span>{settings?.company_tel1}</span>
                                            </a>
                                            <a href={`tel:${settings?.company_tel2}`}>
                                                <span>{settings?.company_tel2}</span>
                                            </a>
                                        </div> */}

                    <div className="footer_links">
                      <Link href={"/pages/cookies"}>
                        <span>{t("cookies")}</span>
                      </Link>
                  
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}
          <div className="copy_right_footer">
            {/* <div className="container"> */}

            <div className="copyright">
              <span>
                {t("copyright")} © Vidaki {currentYear}.{" "}
                {t("allRightsReserved")}
              </span>
            </div>
            <div className="privacyandcondtion">
              <Link href={"/privacy-policy"}>
                <span className="privacy">{t("privacyPolicy")}</span>
              </Link>
              <Link href={"/terms-and-condition"}>
                <span className="terms">{t("termsConditions")}</span>
              </Link>
            </div>
            {/* </div> */}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Footer;
