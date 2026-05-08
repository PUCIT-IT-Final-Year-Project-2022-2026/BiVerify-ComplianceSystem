from flask import Flask, jsonify
from flask_cors import CORS
from config import Config
from routes.auth_routes import bp as auth_bp
from routes.location_routes import bp as location_bp
from routes.booking_routes import bp as booking_bp
from routes.scan_routes import bp as scan_bp
from routes.team_routes import bp as team_bp
from routes.service_request_routes import bp as service_request_bp 
from routes.compliance_operations_routes import bp as compliance_ops_bp
from routes.admin_dashboard_routes import bp as admin_dashboard_bp
from routes.provider_dashboard_routes import bp as provider_dashboard_bp
from routes.incoming_request_routes import bp as incoming_requests_bp

def create_app():
    Config.validate()
    app = Flask(__name__)
    CORS(app, resources={r"/api/*": {"origins": Config.CORS_ORIGINS}}, supports_credentials=False)

    app.register_blueprint(auth_bp)
    app.register_blueprint(location_bp)
    app.register_blueprint(booking_bp)
    app.register_blueprint(scan_bp)
    app.register_blueprint(team_bp)
    app.register_blueprint(service_request_bp) 
    app.register_blueprint(compliance_ops_bp)
    app.register_blueprint(admin_dashboard_bp)
    app.register_blueprint(provider_dashboard_bp)
    app.register_blueprint(incoming_requests_bp)

    @app.get("/api/health")
    def health():
        return jsonify({"ok": True})

    @app.errorhandler(404)
    def not_found(_e):
        return jsonify({"error": {"code": "NOT_FOUND", "message": "Route not found"}}), 404

    @app.errorhandler(500)
    def internal(_e):
        return jsonify({"error": {"code": "INTERNAL", "message": "Server error"}}), 500

    return app


if __name__ == "__main__":
    create_app().run(host="0.0.0.0", port=5050, debug=True)
