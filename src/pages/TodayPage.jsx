import React from "react";
import Menu from "../components/Menu";
import TopBar from "../components/TopBar";
import { PageContainer } from "../styles/template";

export default function TodayPage() {
    return (
        <PageContainer>
            <TopBar></TopBar>
            <Menu></Menu>
        </PageContainer>
    );
}