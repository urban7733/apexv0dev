"use client"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertTriangle,
  CheckCircle,
  XCircle,
  Brain,
  Eye,
  Clock,
  Shield,
  Zap,
  FileText,
  BarChart3,
  AlertCircle,
  Info,
  Download,
  Share2,
  Copy,
  Search,
} from "lucide-react"
import type { ComprehensiveAnalysisResult } from "@/lib/analysis-engine"
import { SpatialAnalysisDisplay } from "./spatial-analysis-display"

interface EnhancedAnalysisDisplayProps {
  result: ComprehensiveAnalysisResult
  onDownloadReport?: () => void
  onShareResult?: () => void
  filePreview?: string
  fileType: "image" | "video" | "audio"
}

export function EnhancedAnalysisDisplay({
  result,
  onDownloadReport,
  onShareResult,
  filePreview,
  fileType,
}: EnhancedAnalysisDisplayProps) {
  const [activeTab, setActiveTab] = useState("overview")
  const [copied, setCopied] = useState(false)

  const getRiskColor = (level: string) => {
    switch (level) {
      case "low":
        return "text-green-400 bg-green-500/20 border-green-500/30"
      case "medium":
        return "text-yellow-400 bg-yellow-500/20 border-yellow-500/30"
      case "high":
        return "text-orange-400 bg-orange-500/20 border-orange-500/30"
      case "critical":
        return "text-red-400 bg-red-500/20 border-red-500/30"
      default:
        return "text-gray-400 bg-gray-500/20 border-gray-500/30"
    }
  }

  const getStatusIcon = () => {
    if (result.isDeepfake) {
      return result.confidence > 0.98 ? (
        <XCircle className="h-8 w-8 text-red-400" />
      ) : (
        <AlertTriangle className="h-8 w-8 text-orange-400" />
      )
    }
    return <CheckCircle className="h-8 w-8 text-green-400" />
  }

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="space-y-6">
      {/* Main Status Card */}
      <Card className="bg-white/5 border-white/10">
        <CardContent className="p-8">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              {getStatusIcon()}
              <div>
                <h2 className="text-2xl font-bold text-white">
                  {result.isDeepfake ? "Deepfake Detected" : "Authentic Content"}
                </h2>
                <p className="text-white/60">
                  Analysis completed with {(result.confidence * 100).toFixed(1)}% confidence
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Badge className={`${getRiskColor(result.riskAssessment.level)} border font-medium px-4 py-2`}>
                {result.riskAssessment.level.toUpperCase()} RISK
              </Badge>
              {result.verificationStatus && (
                <Badge
                  className={`${
                    result.verificationStatus.verified
                      ? "bg-green-500/20 text-green-300 border-green-500/30"
                      : "bg-yellow-500/20 text-yellow-300 border-yellow-500/30"
                  } ml-2`}
                >
                  {result.verificationStatus.verified ? "VERIFIED" : "UNVERIFIED"}
                </Badge>
              )}
            </div>
          </div>

          {/* AI Provider Detection */}
          {result.aiProvider && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <div className="flex items-center gap-2 mb-2">
                <Brain className="h-5 w-5 text-red-400" />
                <span className="font-medium text-red-400">AI Generation Detected</span>
              </div>
              <p className="text-white/80">
                This content appears to have been generated using <strong>{result.aiProvider}</strong>
              </p>
            </div>
          )}

          {/* Verification Status */}
          {result.verificationStatus && (
            <div
              className={`mb-6 p-4 ${
                result.verificationStatus?.verified
                  ? "bg-green-500/10 border border-green-500/20"
                  : "bg-yellow-500/10 border border-yellow-500/20"
              } rounded-lg`}
            >
              <div className="flex items-center gap-2 mb-2">
                {result.verificationStatus?.verified ? (
                  <CheckCircle className="h-5 w-5 text-green-400" />
                ) : (
                  <AlertTriangle className="h-5 w-5 text-yellow-400" />
                )}
                <span className="font-medium">
                  {result.verificationStatus?.verified
                    ? "Verification Badge Available"
                    : "Verification Badge Unavailable"}
                </span>
              </div>
              <p className="text-white/80">{result.verificationStatus?.reason}</p>
            </div>
          )}

          {/* Quick Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{(result.confidence * 100).toFixed(1)}%</div>
              <div className="text-sm text-white/60">Confidence</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{(result.processingTime / 1000).toFixed(1)}s</div>
              <div className="text-sm text-white/60">Processing Time</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">{result.manipulationRegions?.length || 0}</div>
              <div className="text-sm text-white/60">Manipulation Regions</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-white mb-1">
                {(result.fileInfo.size / 1024 / 1024).toFixed(1)}MB
              </div>
              <div className="text-sm text-white/60">File Size</div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-4 mt-6">
            <Button onClick={onDownloadReport} className="bg-white hover:bg-white/90 text-black">
              <Download className="h-4 w-4 mr-2" />
              Download Report
            </Button>
            <Button variant="outline" onClick={onShareResult} className="border-white/20 hover:bg-white/10">
              <Share2 className="h-4 w-4 mr-2" />
              Share Results
            </Button>
            <Button
              variant="outline"
              onClick={() => copyToClipboard(window.location.href)}
              className="border-white/20 hover:bg-white/10"
            >
              {copied ? <CheckCircle className="h-4 w-4 mr-2" /> : <Copy className="h-4 w-4 mr-2" />}
              {copied ? "Copied!" : "Copy Link"}
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Detailed Analysis Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="bg-white/5 border-b border-white/10 w-full justify-start rounded-none p-0">
          <TabsTrigger
            value="overview"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent py-3 px-4"
          >
            <BarChart3 className="h-4 w-4 mr-2" />
            Overview
          </TabsTrigger>
          <TabsTrigger
            value="spatial"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent py-3 px-4"
          >
            <Search className="h-4 w-4 mr-2" />
            Spatial Analysis
          </TabsTrigger>
          <TabsTrigger
            value="technical"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent py-3 px-4"
          >
            <Brain className="h-4 w-4 mr-2" />
            Technical Analysis
          </TabsTrigger>
          <TabsTrigger
            value="risk"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent py-3 px-4"
          >
            <Shield className="h-4 w-4 mr-2" />
            Risk Assessment
          </TabsTrigger>
          <TabsTrigger
            value="metadata"
            className="rounded-none border-b-2 border-transparent data-[state=active]:border-white data-[state=active]:bg-transparent py-3 px-4"
          >
            <FileText className="h-4 w-4 mr-2" />
            File Details
          </TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Analysis Breakdown */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Eye className="h-5 w-5" />
                  Analysis Breakdown
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Face Consistency</span>
                    <span className="text-white font-medium">
                      {(result.analysisDetails.faceConsistency * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.analysisDetails.faceConsistency * 100} className="h-2 bg-white/10" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Temporal Consistency</span>
                    <span className="text-white font-medium">
                      {(result.analysisDetails.temporalConsistency * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.analysisDetails.temporalConsistency * 100} className="h-2 bg-white/10" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Frequency Analysis</span>
                    <span className="text-white font-medium">
                      {(result.analysisDetails.frequencyAnalysis * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.analysisDetails.frequencyAnalysis * 100} className="h-2 bg-white/10" />
                </div>

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-white/60">Metadata Integrity</span>
                    <span className="text-white font-medium">
                      {(result.analysisDetails.metadataIntegrity * 100).toFixed(1)}%
                    </span>
                  </div>
                  <Progress value={result.analysisDetails.metadataIntegrity * 100} className="h-2 bg-white/10" />
                </div>

                {result.analysisDetails.lipSyncAccuracy && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Lip Sync Accuracy</span>
                      <span className="text-white font-medium">
                        {(result.analysisDetails.lipSyncAccuracy * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={result.analysisDetails.lipSyncAccuracy * 100} className="h-2 bg-white/10" />
                  </div>
                )}

                {result.analysisDetails.blinkPattern && (
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span className="text-white/60">Blink Pattern</span>
                      <span className="text-white font-medium">
                        {(result.analysisDetails.blinkPattern * 100).toFixed(1)}%
                      </span>
                    </div>
                    <Progress value={result.analysisDetails.blinkPattern * 100} className="h-2 bg-white/10" />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Manipulation Regions */}
            {result.manipulationRegions && result.manipulationRegions.length > 0 && (
              <Card className="bg-white/5 border-white/10">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <AlertTriangle className="h-5 w-5 text-orange-400" />
                    Manipulation Regions
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {result.manipulationRegions.map((region, index) => (
                      <div key={index} className="p-3 bg-orange-500/10 border border-orange-500/20 rounded-lg">
                        <div className="flex justify-between items-center mb-2">
                          <span className="text-orange-400 font-medium">Region {index + 1}</span>
                          <Badge className="bg-orange-500/20 text-orange-300 border-orange-500/30">
                            {(region.confidence * 100).toFixed(1)}% confidence
                          </Badge>
                        </div>
                        <div className="text-sm text-white/60">
                          Position: ({region.x.toFixed(0)}, {region.y.toFixed(0)}) - Size: {region.width.toFixed(0)}×
                          {region.height.toFixed(0)}px
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </TabsContent>

        <TabsContent value="spatial" className="mt-6">
          {result.spatialAnalysis && (
            <SpatialAnalysisDisplay
              spatialAnalysis={result.spatialAnalysis}
              isDeepfake={result.isDeepfake}
              filePreview={filePreview}
              fileType={fileType}
            />
          )}
        </TabsContent>

        <TabsContent value="technical" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Model Information */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Brain className="h-5 w-5" />
                  AI Models Used
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {result.technicalDetails.modelVersions.map((model, index) => (
                    <div key={index} className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                      <span className="text-white/80">{model}</span>
                      <Badge className="bg-green-500/20 text-green-300 border-green-500/30">Active</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Processing Details */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Zap className="h-5 w-5" />
                  Processing Details
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Analysis Timestamp</span>
                  <span className="text-white/80 text-sm">
                    {new Date(result.technicalDetails.analysisTimestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Processing Time</span>
                  <span className="text-white/80">{(result.processingTime / 1000).toFixed(2)}s</span>
                </div>
                <div>
                  <span className="text-white/60 block mb-2">Processing Nodes</span>
                  <div className="space-y-1">
                    {result.technicalDetails.processingNodes.map((node, index) => (
                      <div key={index} className="text-sm text-white/80 bg-white/5 p-2 rounded">
                        {node}
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk" className="mt-6">
          <Card className="bg-white/5 border-white/10">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5" />
                Risk Assessment
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Risk Level */}
              <div className="text-center p-6 bg-white/5 rounded-lg">
                <div
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full border ${getRiskColor(result.riskAssessment.level)}`}
                >
                  <AlertCircle className="h-5 w-5" />
                  <span className="font-medium">{result.riskAssessment.level.toUpperCase()} RISK</span>
                </div>
              </div>

              {/* Risk Factors */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Risk Factors</h4>
                <div className="space-y-2">
                  {result.riskAssessment.factors.map((factor, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 bg-white/5 rounded-lg">
                      <AlertTriangle className="h-4 w-4 text-orange-400 flex-shrink-0" />
                      <span className="text-white/80">{factor}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Recommendations */}
              <div>
                <h4 className="text-lg font-medium text-white mb-4">Recommendations</h4>
                <div className="space-y-2">
                  {result.riskAssessment.recommendations.map((recommendation, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg"
                    >
                      <Info className="h-4 w-4 text-blue-400 flex-shrink-0" />
                      <span className="text-white/80">{recommendation}</span>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metadata" className="mt-6">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* File Information */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <FileText className="h-5 w-5" />
                  File Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">File Name</span>
                  <span className="text-white/80 text-sm truncate max-w-[200px]">{result.fileInfo.name}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">File Size</span>
                  <span className="text-white/80">{(result.fileInfo.size / 1024 / 1024).toFixed(2)} MB</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">File Type</span>
                  <span className="text-white/80">{result.fileInfo.type}</span>
                </div>
                {result.fileInfo.duration && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Duration</span>
                    <span className="text-white/80">{result.fileInfo.duration.toFixed(2)}s</span>
                  </div>
                )}
                {result.fileInfo.dimensions && (
                  <div className="flex justify-between">
                    <span className="text-white/60">Dimensions</span>
                    <span className="text-white/80">
                      {result.fileInfo.dimensions.width} × {result.fileInfo.dimensions.height}
                    </span>
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Analysis Metadata */}
            <Card className="bg-white/5 border-white/10">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Analysis Metadata
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex justify-between">
                  <span className="text-white/60">Analysis ID</span>
                  <span className="text-white/80 text-sm font-mono">
                    {Math.random().toString(36).substr(2, 9).toUpperCase()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Timestamp</span>
                  <span className="text-white/80 text-sm">
                    {new Date(result.technicalDetails.analysisTimestamp).toLocaleString()}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Processing Time</span>
                  <span className="text-white/80">{(result.processingTime / 1000).toFixed(2)}s</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-white/60">Confidence Score</span>
                  <span className="text-white/80">{(result.confidence * 100).toFixed(2)}%</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}
