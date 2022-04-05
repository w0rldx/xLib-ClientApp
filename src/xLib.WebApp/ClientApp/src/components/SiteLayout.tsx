import { Layout } from 'antd';
import { Content, Footer, Header } from 'antd/lib/layout/layout';
import React from 'react';
import '../styles/SiteLayout.scss';

type Props = {
    children?: React.ReactChild | React.ReactChild[];
    navbar?: React.ReactNode;
    footer?: React.ReactNode;
};

function SiteLayout({ children, navbar, footer }: Props) {
    return (
        <>
            <Layout>
                <Header style={{ paddingRight: 25, paddingLeft: 25 }}>{navbar}</Header>
                <Content>
                    <div className="container">
                        <main className="main">{children}</main>
                    </div>
                </Content>
                <Footer>Footer</Footer>
            </Layout>
        </>
    );
}

export default SiteLayout;
