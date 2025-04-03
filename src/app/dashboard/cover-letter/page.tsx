import ProtectedRoute from '@/components/ProtectedRoute'
import GeneratorForm from '@/components/cover-letter/GeneratorForm'

export default function CoverLetterPage() {
  return (
    <ProtectedRoute>
      <div className="pt-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent mb-8">
            Cover Letter Generator
          </h1>
          <GeneratorForm />
        </div>
      </div>
    </ProtectedRoute>
  )
}
