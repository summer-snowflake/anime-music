# frozen_string_literal: true
class Admin::ActorsController < Admin::BaseController
  before_action :set_actor, only: [:show, :edit, :update, :destroy]

  def index
    @actors = Actor.all
  end

  def show; end

  def new
    @actor = Actor.new
  end

  def edit; end

  def create
    @actor = Actor.new(actor_params)

    respond_to do |format|
      if @actor.save
        format.html { redirect_to ['admin', @actor], notice: '追加しました' }
      else
        format.html { render :new }
      end
    end
  end

  def update
    respond_to do |format|
      if @actor.update(actor_params)
        format.html { redirect_to ['admin', @actor], notice: '更新しました' }
      else
        format.html { render :edit }
      end
    end
  end

  def destroy
    @actor.destroy
    respond_to do |format|
      format.html { redirect_to admin_actors_url, notice: '削除しました' }
    end
  end

  private

  def set_actor
    @actor = Actor.find(params[:id])
  end

  def actor_params
    params.require(:actor).permit(:name)
  end
end
