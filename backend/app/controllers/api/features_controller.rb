require 'bigdecimal'

class Api::FeaturesController < ApplicationController
  before_action :set_feature, only: %i[ show update destroy ]

  # GET /features
  def index
    mag_types = params[:mag_type];

    per_page = params[:per_page].to_i
    page = params[:page].to_i

    per_page = per_page.positive? ? per_page : 10 
    page = page.positive? ? page : 1

    per_page = [per_page, 1000].min  
    page = [page, 1].max

    offset = (page - 1) * per_page

    if mag_types == nil
      @features = Feature.includes(:comments).order(time: :desc).limit(per_page).offset(offset)
    else
      @features = Feature.where(magType: mag_types).order(time: :desc).limit(per_page).offset(offset)
    end
    total = @features.except(:offset, :limit, :order).count

    data = @features.collect do |feature|
        {
          id: feature.id,
          type: "feature",
          attributes: {
            external_id: feature.featureId,
            magnitude: feature.magnitude.to_d,
            place: feature.place,
            time: feature.time.to_s,
            tsunami: feature.tsunami == 1,
            mag_type: feature.magType,
            title: feature.title,
            coordinates: {
              longitude: feature.longitude.to_d,
              latitude: feature.latitude.to_d
            }
          },
          links: {
            external_url: feature.url
          },
          comments: feature.comments
        }
    end

    render json: {
      data: data,
      pagination: {
        current_page: page,
        total: total,
        per_page: per_page
      }

    }
  end

  # GET /features/1
  def show
    render json: @feature
  end

  # POST /features
  def create
    @feature = Feature.new(feature_params)

    if @feature.save
      render json: @feature, status: :created
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # PATCH/PUT /features/1
  def update
    if @feature.update(feature_params)
      render json: @feature
    else
      render json: @feature.errors, status: :unprocessable_entity
    end
  end

  # DELETE /features/1
  def destroy
    @feature.destroy!
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_feature
      @feature = Feature.find(params[:id])
    end

    # Only allow a list of trusted parameters through.
    def feature_params
      params.require(:feature).permit(:featureId, :magnitude, :place, :time, :url, :tsunami, :magType, :title, :longitude, :latitude)
    end
end
