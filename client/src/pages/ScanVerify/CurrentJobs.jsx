import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ProviderStaffSidebar from "../../components/ProviderStaffSidebar";
import "./ScanVerifyPage.css";

// Colors
const G = "#3db546";
const G_SOFT = "#f0fdf4";
const BG = "#f4f5f7";

// Sample Job
const JOBS = [
    {
        id: "PO-1772507457",
        date: "3/27/2026",
        location: "spark",
        assignedTo: "shawn",
        status: "Scheduled",
    },
];

export default function ProviderDashboard() {
    const [jobs, setJobs] = useState(JOBS);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const navigate = useNavigate();

    const handleStartVerification = (job) => {
        setJobs((prev) =>
            prev.map((j) =>
                j.id === job.id ? { ...j, status: "Active" } : j
            )
        );
        navigate("/provider/scan");
    };

    return (
        <div className="layout-container">
            <ProviderStaffSidebar activeItem="jobs" isOpen={isSidebarOpen} />
            {isSidebarOpen && <div className="sidebar-overlay" onClick={() => setIsSidebarOpen(false)} />}

            <div className="body-row">
                <main className="main-content" style={{ background: BG }}>
                    <div style={{
                        display: "flex",
                        justifyContent: "center",
                        paddingTop: 60,
                        paddingBottom: 60,
                        fontFamily: "sans-serif",
                    }}>
                        <div style={{ width: 500 }}>

                            {/* Title */}
                            <h1 style={{ fontSize: 28, fontWeight: "bold", marginBottom: 20 }}>
                                Service Provider Dashboard
                            </h1>

                            {/* Active Operations */}
                            <h3 style={{ marginBottom: 20 }}>
                                Active Operations ({jobs.length})
                            </h3>

                            {jobs.map((job) => (
                                <div
                                    key={job.id}
                                    style={{
                                        background: "#fff",
                                        padding: 20,
                                        borderRadius: 12,
                                        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
                                    }}
                                >
                                    {/* ID + Status */}
                                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                                        <strong>{job.id}</strong>
                                        <span
                                            style={{
                                                background: "#e8f4fd",
                                                padding: "4px 10px",
                                                borderRadius: 20,
                                                fontSize: 12,
                                            }}
                                        >
                                            {job.status}
                                        </span>
                                    </div>

                                    {/* Info */}
                                    <div style={{ marginTop: 10, color: "#555" }}>
                                        <div>📅 {job.date}</div>
                                        <div>📍 {job.location}</div>
                                    </div>

                                    {/* Assigned */}
                                    <div style={{ marginTop: 15 }}>
                                        Assigned to: <strong>{job.assignedTo}</strong>
                                    </div>

                                    {/* Button */}
                                    <button
                                        onClick={() => handleStartVerification(job)}
                                        style={{
                                            marginTop: 20,
                                            width: "100%",
                                            padding: 12,
                                            background: G,
                                            color: "#fff",
                                            border: "none",
                                            borderRadius: 8,
                                            fontWeight: "bold",
                                            cursor: "pointer",
                                        }}
                                    >
                                        Start Verification →
                                    </button>
                                </div>
                            ))}
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}