import * as React from "react"
import { addPropertyControls, ControlType } from "framer"

export default function MultiStepForm(props) {
    const {
        endpointUrl = "https://formspree.io/f/your-form-id",
        backgroundColor = "#050505",
        cardRadius = 24,
        padding = 32,
        primaryColor = "#8B5CF6",
        selectedBackground = "#24143F",
        inputBackground = "#111111",
        borderColor = "#2A2A2A",
        textColor = "#FFFFFF",
        mutedTextColor = "#A1A1AA",
        titleSize = 28,
        bodySize = 14,
        buttonRadius = 999,
    } = props

    const [step, setStep] = React.useState(1)
    const [status, setStatus] = React.useState("")
    const [isSubmitting, setIsSubmitting] = React.useState(false)
    const [hoveredDirection, setHoveredDirection] = React.useState("")

    const [formData, setFormData] = React.useState({
        direction: "",
        details: "",
        fullName: "",
        companyName: "",
        email: "",
        phone: "",
    })

    const directions = [
        "NLP",
        "Computer Vision",
        "Healthcare and Biotech",
        "AI Analytics",
        "Fintech",
        "Education",
        "AI in Cybersecurity",
        "AI for Business Intelligence",
        "Other",
    ]

    function updateField(field, value) {
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }))
    }

    async function submitForm() {
        if (isSubmitting) return

        setIsSubmitting(true)
        setStatus("Sending...")

        try {
            const response = await fetch(endpointUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                },
                body: JSON.stringify(formData),
            })

            if (response.ok) {
                setStatus("Submitted successfully.")
                setStep(4)
            } else {
                setStatus("Something went wrong. Please try again.")
            }
        } catch (error) {
            setStatus("Network error. Please try again.")
        } finally {
            setIsSubmitting(false)
        }
    }

    const progress = Math.round((step / 3) * 100)

    const styles = {
        wrapper: {
            width: "100%",
            padding: padding,
            background: backgroundColor,
            color: textColor,
            borderRadius: cardRadius,
            fontFamily: "Inter, sans-serif",
            boxSizing: "border-box",
        },
        progressWrap: {
            marginBottom: 28,
        },
        progressHeader: {
            display: "flex",
            justifyContent: "space-between",
            marginBottom: 10,
        },
        progressText: {
            fontSize: 13,
            color: mutedTextColor,
        },
        progressTrack: {
            width: "100%",
            height: 8,
            background: inputBackground,
            borderRadius: 999,
            overflow: "hidden",
            border: `1px solid ${borderColor}`,
        },
        progressFill: {
            height: "100%",
            width: `${progress}%`,
            background: primaryColor,
            borderRadius: 999,
            transition: "width 0.3s ease",
        },
        title: {
            fontSize: titleSize,
            margin: "0 0 8px",
            color: textColor,
            fontWeight: 600,
            lineHeight: 1.2,
        },
        subtitle: {
            fontSize: bodySize,
            color: mutedTextColor,
            margin: "0 0 24px",
            lineHeight: 1.5,
        },
        grid: {
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 12,
            marginBottom: 24,
        },
        option: {
            padding: "16px 12px",
            borderRadius: 14,
            color: textColor,
            cursor: "pointer",
            fontSize: bodySize,
            transition:
                "background 0.2s ease, border-color 0.2s ease, box-shadow 0.2s ease, transform 0.2s ease",
            appearance: "none",
            WebkitAppearance: "none",
        },
        textarea: {
            width: "100%",
            minHeight: 160,
            padding: 16,
            borderRadius: 14,
            border: `1px solid ${borderColor}`,
            background: inputBackground,
            color: textColor,
            marginBottom: 20,
            resize: "vertical",
            boxSizing: "border-box",
            fontSize: bodySize,
            outline: "none",
            fontFamily: "Inter, sans-serif",
        },
        input: {
            width: "100%",
            padding: 16,
            borderRadius: 14,
            border: `1px solid ${borderColor}`,
            background: inputBackground,
            color: textColor,
            marginBottom: 12,
            boxSizing: "border-box",
            fontSize: bodySize,
            outline: "none",
            fontFamily: "Inter, sans-serif",
        },
        actions: {
            display: "flex",
            gap: 12,
        },
        primaryButton: {
            width: "100%",
            padding: 16,
            borderRadius: buttonRadius,
            border: "none",
            background: primaryColor,
            color: "#FFFFFF",
            cursor: "pointer",
            fontWeight: 600,
            fontSize: bodySize,
        },
        secondaryButton: {
            width: "100%",
            padding: 16,
            borderRadius: buttonRadius,
            border: `1px solid ${borderColor}`,
            background: inputBackground,
            color: textColor,
            cursor: "pointer",
            fontWeight: 600,
            fontSize: bodySize,
        },
        status: {
            color: mutedTextColor,
            marginTop: 12,
            fontSize: 13,
        },
    }

    return (
        <div style={styles.wrapper}>
            {step < 4 && (
                <div style={styles.progressWrap}>
                    <div style={styles.progressHeader}>
                        <span style={styles.progressText}>
                            Step {step} of 3
                        </span>
                        <span style={styles.progressText}>{progress}%</span>
                    </div>

                    <div style={styles.progressTrack}>
                        <div style={styles.progressFill} />
                    </div>
                </div>
            )}

            {step === 1 && (
                <>
                    <h2 style={styles.title}>
                        Select the Specific Direction for Your AI Project
                    </h2>
                    <p style={styles.subtitle}>
                        Select the area that fits your project best.
                    </p>

                    <div style={styles.grid}>
                        {directions.map((item) => {
                            const isSelected = formData.direction === item
                            const isHovered = hoveredDirection === item

                            return (
                                <button
                                    key={item}
                                    type="button"
                                    onClick={() =>
                                        updateField("direction", item)
                                    }
                                    onMouseEnter={() =>
                                        setHoveredDirection(item)
                                    }
                                    onMouseLeave={() =>
                                        setHoveredDirection("")
                                    }
                                    onFocus={() => setHoveredDirection(item)}
                                    onBlur={() => setHoveredDirection("")}
                                    style={{
                                        ...styles.option,
                                        border: isSelected
                                            ? `1px solid ${primaryColor}`
                                            : `1px solid ${borderColor}`,
                                        background: isSelected
                                            ? selectedBackground
                                            : inputBackground,
                                        boxShadow: isHovered
                                            ? `0 10px 24px rgba(0, 0, 0, 0.18), 0 0 0 1px ${primaryColor}22`
                                            : "0 0 0 rgba(0, 0, 0, 0)",
                                        transform: isHovered
                                            ? "translateY(-2px)"
                                            : "translateY(0)",
                                    }}
                                >
                                    {item}
                                </button>
                            )
                        })}
                    </div>

                    <button
                        type="button"
                        style={{
                            ...styles.primaryButton,
                            opacity: formData.direction ? 1 : 0.5,
                        }}
                        disabled={!formData.direction}
                        onClick={() => setStep(2)}
                    >
                        Next Step
                    </button>
                </>
            )}

            {step === 2 && (
                <>
                    <h2 style={styles.title}>Tell Us About Your Project</h2>
                    <p style={styles.subtitle}>
                        Share a short brief about what you want to build.
                    </p>

                    <textarea
                        style={styles.textarea}
                        value={formData.details}
                        onChange={(e) => updateField("details", e.target.value)}
                        placeholder="Write your project details here..."
                    />

                    <div style={styles.actions}>
                        <button
                            type="button"
                            style={styles.secondaryButton}
                            onClick={() => setStep(1)}
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            style={{
                                ...styles.primaryButton,
                                opacity: formData.details ? 1 : 0.5,
                            }}
                            disabled={!formData.details}
                            onClick={() => setStep(3)}
                        >
                            Continue
                        </button>
                    </div>
                </>
            )}

            {step === 3 && (
                <>
                    <h2 style={styles.title}>Almost Done</h2>
                    <p style={styles.subtitle}>
                        Leave your contact details and we’ll get back to you.
                    </p>

                    <input
                        style={styles.input}
                        value={formData.fullName}
                        onChange={(e) =>
                            updateField("fullName", e.target.value)
                        }
                        placeholder="Full Name"
                    />

                    <input
                        style={styles.input}
                        value={formData.companyName}
                        onChange={(e) =>
                            updateField("companyName", e.target.value)
                        }
                        placeholder="Company Name"
                    />

                    <input
                        style={styles.input}
                        value={formData.email}
                        onChange={(e) => updateField("email", e.target.value)}
                        placeholder="Email"
                        type="email"
                    />

                    <input
                        style={styles.input}
                        value={formData.phone}
                        onChange={(e) => updateField("phone", e.target.value)}
                        placeholder="Phone Number"
                    />

                    <div style={styles.actions}>
                        <button
                            type="button"
                            style={styles.secondaryButton}
                            onClick={() => setStep(2)}
                        >
                            Back
                        </button>

                        <button
                            type="button"
                            style={{
                                ...styles.primaryButton,
                                opacity:
                                    formData.fullName &&
                                        formData.email &&
                                        !isSubmitting
                                        ? 1
                                        : 0.5,
                            }}
                            disabled={
                                !formData.fullName ||
                                !formData.email ||
                                isSubmitting
                            }
                            onClick={submitForm}
                        >
                            {isSubmitting ? "Sending..." : "Submit"}
                        </button>
                    </div>

                    {status && <p style={styles.status}>{status}</p>}
                </>
            )}

            {step === 4 && (
                <>
                    <h2 style={styles.title}>Thank You</h2>
                    <p style={styles.subtitle}>
                        Your request has been submitted successfully.
                    </p>
                </>
            )}
        </div>
    )
}

addPropertyControls(MultiStepForm, {
    endpointUrl: {
        type: ControlType.String,
        title: "Endpoint URL",
        defaultValue: "https://formspree.io/f/your-form-id",
    },
    backgroundColor: {
        type: ControlType.Color,
        title: "Background",
        defaultValue: "#050505",
    },
    inputBackground: {
        type: ControlType.Color,
        title: "Input BG",
        defaultValue: "#111111",
    },
    selectedBackground: {
        type: ControlType.Color,
        title: "Selected BG",
        defaultValue: "#24143F",
    },
    primaryColor: {
        type: ControlType.Color,
        title: "Primary",
        defaultValue: "#8B5CF6",
    },
    borderColor: {
        type: ControlType.Color,
        title: "Border",
        defaultValue: "#2A2A2A",
    },
    textColor: {
        type: ControlType.Color,
        title: "Text",
        defaultValue: "#FFFFFF",
    },
    mutedTextColor: {
        type: ControlType.Color,
        title: "Muted Text",
        defaultValue: "#A1A1AA",
    },
    cardRadius: {
        type: ControlType.Number,
        title: "Card Radius",
        defaultValue: 24,
        min: 0,
        max: 64,
    },
    buttonRadius: {
        type: ControlType.Number,
        title: "Button Radius",
        defaultValue: 999,
        min: 0,
        max: 999,
    },
    padding: {
        type: ControlType.Number,
        title: "Padding",
        defaultValue: 32,
        min: 0,
        max: 80,
    },
    titleSize: {
        type: ControlType.Number,
        title: "Title Size",
        defaultValue: 28,
        min: 16,
        max: 64,
    },
    bodySize: {
        type: ControlType.Number,
        title: "Body Size",
        defaultValue: 14,
        min: 10,
        max: 24,
    },
})
