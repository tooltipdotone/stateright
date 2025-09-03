"use client";
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent";
import QuickAnswerAccordion from "@/components/LandingPage/QuickAnswerAccordion";
import NoData from "@/components/NoDataFound/NoDataFound";
import { CurrentLanguageData } from "@/redux/reuducer/languageSlice";
import { t } from "@/utils";
import { getFaqApi } from "@/utils/api";
import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

const FAQS = () => {
  const [Faq, setFaq] = useState([]);
  const [IsLoading, setIsLoading] = useState(true);
  const CurrentLanguage = useSelector(CurrentLanguageData);

  const getFaqData = async () => {
    try {
      const res = await getFaqApi.getFaq();
      setFaq(res?.data?.data);
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getFaqData();
  }, []);

  return (
    <section className="gradientBg static_pages">
      <div className="container">
        <div className="static_div">
          <div className="text-center">
            <h2
            className="fw-bold mb-4"
            style={{
              fontFamily: "DM Serif Display, serif",
              fontWeight: 400,
              fontSize: "clamp(20px, 5vw, 60px)",
              lineHeight: "1.1",
              color: "#3658BF",
              marginBottom: "2rem",
            }}
          >
            <span style={{ color: "#3658BF" }}>Frequently Asked </span>{" "}
            <span style={{ color: "#F26052" }}>Questions.</span>
          </h2>

          <p className="pb-4">Do you need some help or have some queries ?</p>
          </div>
          <div className="page_content p-4 bg-white rounded">
            <div className="quickanswer_accordion_wrapper">
              {IsLoading ? (
                <div className="profile_sub_loader">
                  <div className="loader"></div>
                </div>
              ) : Faq && Faq.length > 0 ? (
                <QuickAnswerAccordion Faq={Faq} />
              ) : (
                <NoData name={t("faqs")} />
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQS;
