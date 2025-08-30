'use client'
import BreadcrumbComponent from "@/components/Breadcrumb/BreadcrumbComponent"
import { CurrentLanguageData } from "@/redux/reuducer/languageSlice"
import { settingsData } from "@/redux/reuducer/settingSlice"
import { t, validateForm } from "@/utils"
import { contactUsApi } from "@/utils/api"
import { useState } from "react"
import toast from "react-hot-toast"
import { FaFacebook, FaInstagram, FaLinkedin, FaPinterest, FaSquareXTwitter } from "react-icons/fa6"
import { GrLocation } from "react-icons/gr"
import { RiMailSendLine } from "react-icons/ri"
import { TbPhoneCall } from "react-icons/tb"
import { useSelector } from "react-redux"

const ContactUs = () => {
    const CurrentLanguage = useSelector(CurrentLanguageData)
    const systemSettingsData = useSelector(settingsData)
    const settings = systemSettingsData?.data
    const [IsLoading, setIsLoading] = useState(false)

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        subject: '',
        message: ''
    })

    const handleInputChange = (e) => {
        const { name, value } = e.target
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }))
    }

    const handleSubmit = async (e) => {
        e.preventDefault()

        if (!validateForm(formData)) {
            return
        }

        try {
            setIsLoading(true)
            const res = await contactUsApi.contactUs(formData)
            if (res?.data?.error === false) {
                toast.success(t("thankForContacting"))
            }
            else {
                toast.error(t("errorOccurred"))
            }

            // Clear form after successful submission
            setFormData({
                name: '',
                email: '',
                subject: '',
                message: ''
            })
        } catch (error) {
            console.log(error)
            toast.error(t("errorOccurred"))
        }
        finally {
            setIsLoading(false)
        }
    }

    return (
        <>
            <div className="contact-page-container"
                style={{
                    background: "linear-gradient(180deg, #FFEC8D, rgba(255, 255, 255, 1) 100%)",
                   
                }}
            >
                <div className="contact-page-wrapper">
                    {/* Left Column - Contact Information */}
                    <div className="contact-info-section">
                        <div className="contact-info-content">
                            <h2 className="contact-title">
                                <span className="contact-title-primary">{t("contactUs")}</span>
                                {/* <span className="contact-title-accent">Us.</span> */}
                            </h2>
                            <p className="contact-description mb-2">
                               {t("contactIntro")}
                            </p>

                            <div className="contact-details">
                                {settings?.company_email && (
                                    <div className="contact-detail-item">
                                        <div className="contact-icon">
                                            <RiMailSendLine size={20} />
                                        </div>
                                        <span className="contact-text">{settings.company_email}</span>
                                    </div>
                                )}
                                {settings?.company_tel1 && (
                                    <div className="contact-detail-item">
                                        <div className="contact-icon">
                                            <TbPhoneCall size={20} />
                                        </div>
                                        <span className="contact-text">{settings.company_tel1}</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Contact Form */}
                    <div className="contact-form-section">
                        <div className="contact-form-card">
                            <h3 className="form-title">
                                <span className="form-title-primary">{t("sendMessage")}</span>
                                {/* <span className="form-title-accent">message.</span> */}
                            </h3>

                            <form className="contact-form" onSubmit={handleSubmit}>
                                <div className="form-group">
                                    <label htmlFor="name" className="form-label">{t('name')}</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        className="form-input"
                                        placeholder={t("enterName")}
                                        value={formData.name}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="email" className="form-label">{t('email')}</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        className="form-input"
                                        placeholder={t("enterEmail")}
                                        value={formData.email}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="subject" className="form-label">{t('subject')}</label>
                                    <input
                                        type="text"
                                        id="subject"
                                        name="subject"
                                        className="form-input"
                                        placeholder={t("enterSubject")}
                                        value={formData.subject}
                                        onChange={handleInputChange}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="message" className="form-label">{t('message')}</label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        className="form-textarea"
                                        placeholder={t("enterMessage")}

                                        rows="5"
                                        value={formData.message}
                                        onChange={handleInputChange}
                                        required
                                    ></textarea>
                                </div>

                                <button
                                    type="submit"
                                    className="submit-button"
                                    disabled={IsLoading}
                                >
                                    {IsLoading ? 'Loading...' : t('submit')}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>

            <style jsx>{`
                .contact-page-container {
                    min-height: 100vh;
                    background: linear-gradient(135deg, #fef9e7 0%, #fef3c7 50%, #fde68a 100%);
                    padding: 40px 20px;
                }

                .contact-page-wrapper {
                    max-width: 1200px;
                    margin: 0 auto;
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 60px;
                    align-items: start;
                }

                /* Left Column Styles */
                .contact-info-section {
                    display: flex;
                    align-items: center;
                    min-height: 500px;
                }

                .contact-info-content {
                    max-width: 400px;
                }

                .contact-title {
                    font-size: 2.5rem;
                    font-weight: 700;
                    margin-bottom: 20px;
                    line-height: 1.2;
                }

                .contact-title-primary {
                    color: #1e3a8a;
                }

                .contact-title-accent {
                    color: #ea580c;
                }

                .contact-description {
                    font-size: 1.1rem;
                    color: #374151;
                    line-height: 1.6;
                    margin-bottom: 40px;
                }

                .contact-details {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .contact-detail-item {
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }

                .contact-icon {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    width: 40px;
                    height: 40px;
                    background-color: #ea580c;
                    border-radius: 50%;
                    color: white;
                }

                .contact-text {
                    font-size: 1rem;
                    color: #374151;
                    font-weight: 500;
                }

                /* Right Column Styles */
                .contact-form-section {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    min-height: 500px;
                }

                .contact-form-card {
                    background: white;
                    padding: 40px;
                    border-radius: 16px;
                    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
                    width: 100%;
                    max-width: 500px;
                }

                .form-title {
                    font-size: 1.8rem;
                    font-weight: 600;
                    margin-bottom: 30px;
                    line-height: 1.2;
                }

                .form-title-primary {
                    color: #1e3a8a;
                }

                .form-title-accent {
                    color: #ea580c;
                }

                .contact-form {
                    display: flex;
                    flex-direction: column;
                    gap: 20px;
                }

                .form-group {
                    display: flex;
                    flex-direction: column;
                    gap: 8px;
                }

                .form-label {
                    font-size: 0.9rem;
                    font-weight: 600;
                    color: #374151;
                }

                .form-input,
                .form-textarea {
                    padding: 12px 16px;
                    border: 2px solid #e5e7eb;
                    border-radius: 8px;
                    font-size: 1rem;
                    transition: all 0.3s ease;
                    background-color: #f9fafb;
                }

                .form-input:focus,
                .form-textarea:focus {
                    outline: none;
                    border-color: #ea580c;
                    background-color: white;
                    box-shadow: 0 0 0 3px rgba(234, 88, 12, 0.1);
                }

                .form-textarea {
                    resize: vertical;
                    min-height: 120px;
                }

                .submit-button {
                    background-color: #ea580c;
                    color: white;
                    border: none;
                    padding: 14px 28px;
                    border-radius: 8px;
                    font-size: 1rem;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    margin-top: 10px;
                }

                .submit-button:hover:not(:disabled) {
                    background-color: #dc2626;
                    transform: translateY(-2px);
                    box-shadow: 0 4px 12px rgba(234, 88, 12, 0.3);
                }

                .submit-button:disabled {
                    opacity: 0.7;
                    cursor: not-allowed;
                }

                /* Responsive Design */
                @media (max-width: 768px) {
                    .contact-page-wrapper {
                        grid-template-columns: 1fr;
                        gap: 40px;
                    }

                    .contact-info-section {
                        min-height: auto;
                        text-align: center;
                    }

                    .contact-info-content {
                        max-width: 100%;
                    }

                    .contact-title {
                        font-size: 2rem;
                    }

                    .contact-form-card {
                        padding: 30px 20px;
                    }

                    .form-title {
                        font-size: 1.5rem;
                    }
                }

                @media (max-width: 480px) {
                    .contact-page-container {
                        padding: 20px 15px;
                    }

                    .contact-title {
                        font-size: 1.8rem;
                    }

                    .contact-description {
                        font-size: 1rem;
                    }

                    .contact-form-card {
                        padding: 25px 15px;
                    }
                }
            `}</style>
        </>
    )
}

export default ContactUs