<xsl:stylesheet version="1.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform">

    <xsl:output method="xml" indent="yes" />

    <xsl:template match="/">
        <templateSet group="Zurb-Foundation">
            <xsl:for-each select="/fileset/files">
                <xsl:apply-templates select="document(text(),.)/snippet" />
            </xsl:for-each>
        </templateSet>
    </xsl:template>

    <xsl:template match="snippet">
            <xsl:apply-templates select="content"/>
    </xsl:template>

    <xsl:template match="content">
        <xsl:element name="template">
            <xsl:attribute name="name">
                <xsl:value-of select="../tabTrigger"/>
            </xsl:attribute>
            <xsl:attribute name="value">
                <xsl:value-of select="node()"/>
            </xsl:attribute>
            <xsl:attribute name="description">
                <xsl:value-of select="../description"/>
            </xsl:attribute>
            <xsl:attribute name="toReformat">false</xsl:attribute>
            <xsl:attribute name="toShortenFQNames">true</xsl:attribute>
            <context>
                <xsl:element name="option">
                    <xsl:attribute name="name">HTML_TEXT</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'html')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">HTML</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'html')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">XSL_TEXT</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'xsl')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">XML</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'xml')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">JSP</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'jsp')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">CSS_PROPERTY_VALUE</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'css')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">CSS_DECLARATION_BLOCK</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'css')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">CSS_RULESET_LIST</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'css')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">CSS</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'css')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">JAVA_SCRIPT</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'javacsript')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">TypeScript</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'typescript')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">DART</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'dart')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">CoffeeScript</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'coffee')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">HAML</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'haml')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">JADE</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'jade')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>

                <xsl:element name="option">
                    <xsl:attribute name="name">OTHER</xsl:attribute>
                    <xsl:attribute name="value">
                        <xsl:choose>
                            <xsl:when test="contains(../scope/text(), 'other')">true</xsl:when>
                            <xsl:otherwise>false</xsl:otherwise>
                        </xsl:choose>
                    </xsl:attribute>
                </xsl:element>
            </context>
        </xsl:element>
    </xsl:template>

</xsl:stylesheet>